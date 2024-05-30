import { useContext, useEffect, useRef } from 'react';
import { MessageContext } from '@cadence-support/context';

import styles from './DragNDropFile.module.scss';
import { Close, TrayArrowUp } from '@cadence-support/icons';
import { Button, Image } from '@cadence-support/components';
import { getFileSizeFromBytes } from '@cadence-support/utils';

/**
 * This widget provide an interface to drag and drop file.
 *
 * Note that file extensions that are to be allowed should be given in an array (without dots[.] at beginning) to extnsAllowed props. By default extnsAllowed is a blank array signifying all file extensions are allowed.
 *
 * @widget
 * @example
 * const [file, setFile] = useState(null)
 *
 * <DragNDropFile
 *   droppedFile={file}
 *   setDroppedFile={setFile}
 *   extnsAllowed={["png", "jpg", "jpeg"]}
 * />
 **/

const DragNDropFile = ({
  droppedFile,
  setDroppedFile,
  showFileDetails,
  extnsAllowed,
  placeholder,
  className,
}) => {
  let inputRef = useRef(null);
  let imageRef = useRef(null);

  const { addError } = useContext(MessageContext);

  const fileChangedHandler = (file, cb) => {
    if (file) {
      const ext = file.type.split('/')[1];
      if (extnsAllowed.length && !extnsAllowed.includes(ext)) {
        let errorMessage = 'File should be of type ';
        extnsAllowed.forEach((extn, i) => {
          errorMessage += extn;
          if (i < extnsAllowed.length - 1) errorMessage += '/';
        });
        return addError(errorMessage);
      }
      if (file.size > 2000000)
        return addError('File size should be less than 2MB');
      setDroppedFile(file);
    }
    if (cb && typeof cb === 'function') {
      cb();
    }
  };

  const shortenFileName = (fileName) => {
    let splits = fileName.split('.');
    let name = splits[0];
    let extn = splits[splits.length - 1];
    let maxNameLen = 18 - extn.length;
    if (name.length > maxNameLen) {
      return `${name.substring(0, maxNameLen - 5)}...${name.substring(
        name.length - 2
      )}.${extn}`;
    } else {
      return `${name}.${extn}`;
    }
  };

  useEffect(() => {
    if (droppedFile && showFileDetails) {
      let reader = new FileReader();

      let imgtag = imageRef.current;
      imgtag.title = droppedFile?.name;

      reader.onload = function (event) {
        imgtag.src = event.target.result;
      };

      reader.readAsDataURL(droppedFile);
    }
  }, [droppedFile]);

  return (
    <div className={`${styles.wrapper} ${className ?? ''}`}>
      <div
        className={styles.dragNdrop}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          fileChangedHandler(e.dataTransfer.files[0]);
        }}
      >
        <TrayArrowUp />
        <p>{placeholder}</p>
        <p>or</p>
        <Button
          className={styles.browseFilesBtn}
          onClick={() => {
            inputRef.click();
          }}
        >
          <input
            type="file"
            style={{ display: 'none' }}
            onChange={(e) => {
              fileChangedHandler(e.target.files[0], () => {
                e.target.value = null;
              });
            }}
            ref={(fileInput) => {
              inputRef = fileInput;
            }}
          />
          Browse files
        </Button>
      </div>
      {showFileDetails && droppedFile?.name && (
        <div className={styles.fileCard}>
          <Image ref={imageRef} className={styles.image} alt="" />
          <div className={styles.info}>
            <p className={styles.fileName}>
              {shortenFileName(droppedFile.name)}
            </p>
            <p className={styles.fileSize}>
              Size: {getFileSizeFromBytes(droppedFile.size)}
            </p>
          </div>
          <Close
            className={styles.close}
            onClick={() => setDroppedFile(null)}
          />
        </div>
      )}
    </div>
  );
};

DragNDropFile.defaultProps = {
  placeholder: 'Drag and drop file here',
  showFileDetails: true,
  extnsAllowed: [],
};

export default DragNDropFile;
