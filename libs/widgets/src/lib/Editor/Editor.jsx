import { ENV } from '@cadence-support/environments';
import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useContext, useEffect, useRef, useState, useCallback } from 'react';
import TextEditor from '@cadence-ringover/editor';
import './Editor.css';
import './Editor.scss';
import styles from './Editor.module.scss';
import { Close, Info } from '@cadence-support/icons';
import { SearchBar } from '@cadence-support/widgets';
import {
  Div,
  ErrorBoundary,
  Spinner,
  Tooltip,
} from '@cadence-support/components';

import {
  Colors,
  stripTrackingImage,
  useDidMountEffect,
  useForceUpdate,
} from '@cadence-support/utils';
import {
  useOutsideClickHandler,
  clearAttachments,
  processCustomVariables,
} from '@cadence-support/utils';
import {
  CUSTOM_VARIABLES_OPTIONS,
  EDITOR_CONFIG,
  ACCOUNT_CUSTOM_VARIABLES,
  LEAD_CUSTOM_VARIABLES,
  USER_CUSTOM_VARIABLES,
  MISC_CUSTOM_VARIABLES,
  EDITOR_ATTACHMENT_EVENTS_ENUM,
  IS_CUSTOM_VAR_FIELD_MAP_AVAILABLE,
  formatter,
  getLeadAccountVariablesByIntegration,
  INTEGRATION_MAP_KEYS,
  reconcileAttachments,
  COUNT_AVAILABLE,
  parseEditorValues,
  CUSTOM_VARS_NAMES_BY_INTEGRATION,
} from './constants';
import { MessageContext } from '@cadence-support/context';
import { useRecoilValue } from 'recoil';
import { userInfo } from '@cadence-support/atoms';
import {
  LEAD_INTEGRATION_TYPES,
  CRM_CUSTOM_VARIABLES,
  INTEGRATION_TYPE,
  IS_CUSTOM_VARS_AVAILABLE,
} from '@cadence-support/constants';
import CalendlyErrorModal from './components/CalendlyErrorModal/CalendlyErrorModal';

const Editor = ({
  value,
  setValue,
  className,
  files,
  setFiles,
  disabled = false,
  height = '100%',
  width = '100%',
  loading = false,
  theme = 'no_attachments',
  showAllMiscVars = true,
  showCRMCustomVars = false,
  // fileIdsRef,
  lead = null,
  style,
  charLimit = null,
  ...rest
}) => {
  const editorRef = useRef(null);
  const textareaRef = useRef(null);
  const { addError } = useContext(MessageContext);
  const user = useRecoilValue(userInfo);

  const [customVariables, setCustomVariables] = useState({
    account_map: {},
    lead_map: {},
    user_map: user,
    loading: true,
  });
  const [editorReady, setEditorReady] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (charLimit) {
      if (parseEditorValues(value)?.length > charLimit) {
        addError(`Please enter characters below ${charLimit}`);
      }
    }
  }, [value]);

  const handleRemoveFile = (file) => {
    if (typeof setFiles !== 'function') return;
    setFiles((prev) =>
      prev.filter(
        (f) =>
          f?.original_name !== file?.original_name || f?.name !== file?.name
      )
    );
    window.sessionStorage.removeItem(`${file.original_name}-attachment`);
  };

  const addAttachment = (e) => onUploadAttachments(e);
  const updateAttachmentInList = useCallback(
    (e) => {
      if (typeof setFiles !== 'function') return;
      let ind = files?.findIndex(
        (f) => f?.original_name === e?.detail.original_name
      );
      let fileUpload = JSON.parse(
        window.sessionStorage.getItem(`${e.detail.original_name}-attachment`)
      );
      if (e.detail) fileUpload = e.detail;

      setFiles((prev) =>
        prev?.map((file, index) =>
          index === ind
            ? { ...file, ...fileUpload, loading: false, deletable: true }
            : file
        )
      );
    },
    [files]
  );
  let toolbarId = `toolbar-${Math.floor(Math.random() * 100 + 1)}`;

  const onUploadAttachments = (fileUploadEvent) => {
    if (fileUploadEvent) {
      const file_object = {
        original_name: fileUploadEvent?.detail?.name,
        loading: true,
        id: null,
        file: fileUploadEvent.detail,
      };
      let ind = files?.findIndex(
        (f) =>
          f?.original_name === fileUploadEvent?.detail.name ||
          f?.name === fileUploadEvent?.detail.name
      );

      if (ind !== -1) return;
      setFiles((prev) => [...prev, file_object]);
    }
  };

  // // listen to events to add attachments on window
  useEffect(() => {
    window.addEventListener(
      EDITOR_ATTACHMENT_EVENTS_ENUM.FILE_UPLOAD_BEGIN,
      addAttachment
    );
    window.addEventListener(
      EDITOR_ATTACHMENT_EVENTS_ENUM.FILE_UPLOAD_SUCCESS,
      updateAttachmentInList
    );
    window.addEventListener(
      EDITOR_ATTACHMENT_EVENTS_ENUM.ATTACHMENT_LIMIT,
      () => {
        addError("You can't upload more than 2 files");
      }
    );
    window.addEventListener(
      EDITOR_ATTACHMENT_EVENTS_ENUM.FILE_SIZE_LIMIT,
      () => {
        addError('File size limit exceeded (5MB)');
      }
    );

    return () => {
      window.removeEventListener(
        EDITOR_ATTACHMENT_EVENTS_ENUM.FILE_UPLOAD_BEGIN,
        addAttachment
      );
      window.removeEventListener(
        EDITOR_ATTACHMENT_EVENTS_ENUM.FILE_UPLOAD_SUCCESS,
        updateAttachmentInList
      );
      window.removeEventListener(
        EDITOR_ATTACHMENT_EVENTS_ENUM.ATTACHMENT_LIMIT,
        () => {
          addError("You can't upload more than 2 files");
        }
      );
      window.removeEventListener(
        EDITOR_ATTACHMENT_EVENTS_ENUM.FILE_SIZE_LIMIT,
        () => {
          addError('File size limit exceeded (5MB)');
        }
      );
    };
  }, [files]);

  useDidMountEffect(() => {
    // setEditorReady(false);
    setTimeout(() => setEditorReady(true), 1000);
  }, [theme]);

  return (
    <>
      {editorReady ? (
        <Div
          dataTestId="TextEditorTest"
          className={`editor ${theme === 'message' ? 'message' : ''} ${
            className ?? ''
          }`}
          loading={isLoading}
          style={{ height, width, ...style }}
        >
          {theme === 'message' ||
          rest.type === 'sms' ||
          rest.type === 'linkedin' ? (
            <textarea
              disabled={disabled}
              ref={textareaRef}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          ) : (
            <CKEditor
              editor={TextEditor}
              config={{
                ...EDITOR_CONFIG[theme],
                link: {
                  defaultProtocol: 'https://',
                },
                authorization_token: user?.ringover_tokens?.id_token,
                backend: ENV.BACKEND,
                htmlSupport: {
                  allow: [
                    {
                      name: /^(div|span|p|img|a|table|tr|th|td)$/,
                      classes: true,
                      styles: true,
                    },
                  ],
                },
              }}
              data={stripTrackingImage(value) ? stripTrackingImage(value) : ''}
              onReady={(editor) => {
                //add toolbar
                window.editor = editor;
                if (disabled) {
                  editor.enableReadOnlyMode('ck-editor-lock');
                } else {
                  editorRef.current = editor;
                  document
                    .querySelector(`#${toolbarId}`)
                    ?.appendChild(editor.ui.view.toolbar.element);
                  // editor.on("handle_attachment_click", addAttachment);
                  //adjust tooltip position
                  editor?.ui.view.toolbar.items.map((item) => {
                    //button positionging( without dropdowns)
                    item.tooltipPosition = 'se';
                    //for dropdowns
                    if (item.buttonView) {
                      item.buttonView.tooltipPosition = 'se';
                    }
                    return item;
                  });
                }
              }}
              onChange={(event, editor) => {
                setValue(editor.getData());
              }}
              isReadOnly={disabled}
            />
          )}
          {files?.length > 0 && (
            <div className={styles.filesSelected}>
              {files?.map((file) => (
                <div>
                  <span key={file?.original_name}>
                    <Div
                      style={{
                        transform: 'translate(-2px,4px)',
                      }}
                      span={true}
                      loading={file?.loading}
                      loader="spinner"
                      color="purple"
                    ></Div>
                    <span className={styles.fileName}>
                      {file?.original_name || file?.name}
                    </span>
                    <button
                      className={styles.removeFile}
                      onClick={() => handleRemoveFile(file)}
                    >
                      <Close />
                    </button>
                  </span>
                  {/* {file.loading && (
									<progress
										max="100"
										value={file.progress}
									></progress>
								)} */}
                </div>
              ))}
            </div>
          )}
          {theme === 'message' ? (
            !disabled && (
              <div className="toolbar">
                <CustomVariablesDropdown
                  textareaRef={textareaRef}
                  value={value}
                  setValue={setValue}
                  showAllMiscVars={showAllMiscVars}
                  theme={theme}
                  template={lead ? false : true}
                  charLimit={charLimit}
                  loading={isLoading}
                />
              </div>
            )
          ) : (
            <>
              {!disabled && <div id={toolbarId} className="toolbar"></div>}

              {!disabled && (
                <CustomVariablesDropdown
                  editorRef={editorRef}
                  value={value}
                  setValue={setValue}
                  showAllMiscVars={showAllMiscVars}
                  theme={theme}
                  template={lead ? false : true}
                  charLimit={charLimit}
                  loading={isLoading}
                />
              )}
            </>
          )}
        </Div>
      ) : (
        <div className={styles.loaderWrapper}>
          <Spinner color={Colors.lightBlue} size="2rem" />{' '}
        </div>
      )}
    </>
  );
};

export default React.memo(Editor);
const CustomVariablesDropdown = ({
  textareaRef,
  value,
  setValue,
  editorRef,
  showAllMiscVars,
  theme,
  user,
  template,
  charLimit,
  loading,
}) => {
  const [dropdown, setDropdown] = useState(false);
  const [customVariableOptions, setCustomVariablesOptions] = useState(
    CUSTOM_VARIABLES_OPTIONS
  );
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({
    top: '',
    bottom: '',
    button: '',
  });
  const [search, setSearch] = useState('');

  const dropDownRef = useRef();

  const onClose = () => {
    setDropdown(false);
  };
  useOutsideClickHandler(dropDownRef, onClose, false);

  const handleOptionClick = (option) => {
    // if (checkCalendlyLinkExists(option)) return;
    if (textareaRef?.current) {
      let selectionStart = textareaRef?.current?.selectionStart;
      let selectionEnd = textareaRef?.current?.selectionEnd;
      setValue(
        `${value?.slice(0, selectionStart)}${option}${value?.slice(
          selectionEnd
        )}`
      );
      textareaRef.current.focus();
      setDropdown(false);
    } else {
      editorRef.current.model.change((writer) => {
        const range =
          editorRef.current.model.document.selection.getFirstRange();
        editorRef.current.model.insertContent(writer.createText(option), range);
      });
      setDropdown(false);
    }
  };

  const filterCustomVariables = () => {
    try {
      let crm_custom_variables = [];

      // remove unsubscribe link from MISC_CUSTOM_VARIABLES if theme === 'message'
      let misc_variables =
        theme === 'message'
          ? MISC_CUSTOM_VARIABLES.filter(
              (cv) => cv !== '{{unsubscribe(Unsubscribe)}}'
            )
          : MISC_CUSTOM_VARIABLES;

      // Some Misc variables are removed if showAllMiscVars is false
      if (!showAllMiscVars)
        misc_variables = misc_variables.filter(
          (cv) =>
            cv !== '{{ringover_meet}}' &&
            cv !== '{{user_signature}}' &&
            cv !== '{{custom_link()}}' &&
            cv !== '{{unsubscribe(Unsubscribe)}}'
        );

      // if (user_variables.length > 0) user_variables.unshift('Sender');
      // let AVAILABLE_CUSTOM_VARIABLES = [];

      misc_variables = misc_variables.filter(
        (cv) =>
          cv !== '{{today_day(fr)}}' &&
          cv !== '{{today_day(es)}}' &&
          cv !== '{{tomorrow_day(fr)}}' &&
          cv !== '{{tomorrow_day(es)}}' &&
          cv !== '{{N_days_day(fr)}}' &&
          cv !== '{{N_days_day(es)}}' &&
          cv !== '{{N_days_ago_day(fr)}}' &&
          cv !== '{{N_days_ago_day(es)}}' &&
          cv !== '{{N_week_days_from_now_day(fr)}}' &&
          cv !== '{{N_week_days_from_now_day(es)}}' &&
          cv !== '{{N_week_days_ago_day(fr)}}' &&
          cv !== '{{N_week_days_ago_day(es)}}'
      );

      // setCustomVariablesOptions(AVAILABLE_CUSTOM_VARIABLES);
    } catch (err) {
      // do nothing
    }
  };

  const searchCustomVariables = (customVariableOptions) => {
    const filteredArray = customVariableOptions.filter((item) => {
      if (!item.includes('{{')) return true;
      return item?.toLowerCase().includes(search.toLowerCase());
    });

    let indexesToDelete = [];

    //Remove label if there are no custom variables after the label after filtering
    filteredArray.forEach((item, index) => {
      if (!item?.includes('{{')) {
        if (!filteredArray[index + 1]?.includes('{{'))
          indexesToDelete.push(index);
      }
    });
    indexesToDelete.reverse().forEach((index) => {
      filteredArray.splice(index, 1);
    });
    if (filteredArray.length === 0) filteredArray.push('No variables found');
    return filteredArray;
  };

  const getClassName = () => {
    if (theme === 'email') return 'customVariablesEditorSend';
    else if (theme === 'message') return 'customVariables';
    else if (template && theme !== 'no_attachments')
      return 'customVariablesEditorSend';
    else return 'customVariablesEditorTemplate';
  };

  return (
    <div
      ref={dropDownRef}
      className={`${getClassName()} ${charLimit ? 'countActive' : ''}`}
    >
      <button
        onClick={() => {
          if (textareaRef?.current) textareaRef.current.focus();
          setDropdown((curr) => !curr);
        }}
      >
        {'{{A}}'}
      </button>

      {charLimit && (
        <div className="charCountWrapper">
          <p>
            <span
              style={
                value && parseEditorValues(value)?.length > charLimit
                  ? { color: '#f77272' }
                  : {}
              }
            >
              {parseEditorValues(value)?.length}
            </span>{' '}
            / <span>{charLimit}</span>
          </p>{' '}
          <Tooltip
            text={'Character count includes html'}
            className={'charCountText'}
            theme="LEFT"
          >
            <Info size={'15px'} />
          </Tooltip>
        </div>
      )}

      {dropdown && (
        <div className="options">
          <div className="searchBox">
            <SearchBar
              height="34px"
              width="215px"
              value={search}
              setValue={setSearch}
              // onSearch={handleSearch}
            />
          </div>

          {loading
            ? new Array(15).fill(0).map(() => (
                <Div
                  loading={true}
                  span={true}
                  style={{
                    width: '93%',
                    margin: '0.3em 0.5em',
                  }}
                ></Div>
              ))
            : searchCustomVariables(CUSTOM_VARIABLES_OPTIONS)?.map((option) =>
                option.includes('{{') ? (
                  <button onClick={() => handleOptionClick(option)}>
                    {option}
                  </button>
                ) : (
                  <span>{option}</span>
                )
              )}
        </div>
      )}
    </div>
  );
};
