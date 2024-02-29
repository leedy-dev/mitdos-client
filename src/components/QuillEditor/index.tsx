import React, { Ref, useCallback, useRef } from 'react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

interface QuillEditorProps {
    ref: Ref<any>;
    maxImageSize?: number;
    setTempImageList?: any;
    defaultValue?: string;
}

function QuillEditor(props: QuillEditorProps, ref) {
    const { maxImageSize, setTempImageList, defaultValue, ...rest } = props;

    /* Handle Image Upload (s) */
    /* Image States */
    const imageRef = useRef(null);
    // image size
    const size = maxImageSize || 1010485760; // default 10MB

    // click image upload button
    const onClickImageButton = useCallback(() => {
        imageRef.current.click();
    }, [imageRef.current]);

    const onChangeImageInputQuill = e => {
        const imageFormData = new FormData();
        const file = e.target.files[0];
        const ext = file.name.split('.').pop(); // 확장자
        if (ext !== 'png' && ext !== 'jpg') {
            alert('png 혹은 jpg 파일만 가능'); // 임시
            return;
        } else if (file.size > size) {
            alert(size + ' 이하의 파일만 가능'); // 임시
            return;
        } else {
            const reader = new FileReader();
            reader.onloadend = () => {
                // 이미지 업로드하면 에디터에 삽입
                ref.current.editor.root.innerHTML =
                    ref.current.editor.root.innerHTML + `<img src=${reader.result}  alt=""/>`;
            };
            imageFormData.append('uploadEditorImage', file);
            reader.readAsDataURL(file);
            // 파일 set
        }
        // ----- 이미지 임시 저장 api -----
        // -----------------------------
    };
    /* Handle Image Upload (e) */

    /* Quill (s) */
    // quill toolbar, handlers
    const quill = {
        modules: {
            toolbar: {
                container: [
                    [{ font: [] }],
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    [{ color: [] }, 'bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [
                        { list: 'ordered' },
                        { list: 'bullet' },
                        { indent: '-1' },
                        { indent: '+1' },
                    ],
                    ['link', 'image'],
                    [{ align: [] }, { background: [] }], // dropdown with defaults from theme
                    ['clean'],
                ],
                handlers: { image: onClickImageButton }
            },
        },
        formats: [
            'font',
            'header',
            'bold',
            'italic',
            'underline',
            'strike',
            'blockquote',
            'color',
            'list',
            'bullet',
            'indent',
            'link',
            'image',
            'align',
            'color',
            'background',
        ],
    };
    /* Quill (e) */

    return (
        <div style={{ height: '342px' }}>
            <ReactQuill
                ref={ref}
                style={{ height: '300px' }}
                placeholder="내용 입력"
                theme="snow"
                modules={quill.modules}
                formats={quill.formats}
                defaultValue={defaultValue || ''}
                {...rest}
            />
            <input
                hidden
                type="file"
                onChange={onChangeImageInputQuill}
                ref={imageRef}
            />
        </div>
    );
}

const forwardRef = React.forwardRef(QuillEditor);

export default forwardRef;