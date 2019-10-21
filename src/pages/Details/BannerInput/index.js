import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import { MdCameraAlt } from 'react-icons/md';

import api from '~/services/api';

import { Container } from './styles';

export default function BannerInput() {
  const { defaultValue, registerField } = useField('file');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'file_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref, registerField]); //eslint-disable-line

  async function handleChange(e) {
    const data = new FormData();

    data.append('File', e.target.files[0]);

    const response = await api.post('files', data);

    const { url, id } = response.data;

    setPreview(url);
    setFile(id);
  }

  return (
    <Container>
      <label htmlFor="banner">
        {preview ? (
          <img src={preview} alt="Banner" />
        ) : (
          <div>
            <MdCameraAlt size={40} color="#999" />
            <strong>Select Image</strong>
          </div>
        )}

        <input
          type="file"
          id="banner"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}

// import React, { useState, useRef, useEffect } from 'react';
// import { useField } from '@rocketseat/unform';
// import { MdCameraAlt } from 'react-icons/md';

// import api from '~/services/api';

// import { Container } from './styles';

// export default function BannerInput() {
//   const { defaultValue, registerField } = useField('file');
//   const { error } = useField('file');

//   const [file, setFile] = useState(defaultValue && defaultValue.id);
//   const [preview, setPreview] = useState(defaultValue && defaultValue.url);

//   const ref = useRef();

//   // useEffect(() => {
//   //   if (defaultValue) {
//   //     setFile(defaultValue.id);
//   //     setPreview(defaultValue.url);
//   //   }
//   // }, [defaultValue]);

//   useEffect(() => {
//     if (ref.current) {
//       registerField({
//         name: 'file_id',
//         ref: ref.current,
//         path: 'dataset.file',
//       });
//     }
//   }, [ref.registerField, registerField]);

//   async function handleChange(e) {
//     const data = new FormData();

//     data.append('file', e.target.files[0]);

//     const response = await api.post('files', data);

//     const { id, url } = response.data;

//     setFile(id);
//     setPreview(url);
//   }

//   return (
//     <Container>
//       <label htmlFor="file">
//         {preview ? (
//           <img src={preview} alt="file" />
//         ) : (
//           <div>
//             <MdCameraAlt size={40} color="#999" />
//             <strong>Select an Image</strong>
//           </div>
//         )}

//         <input
//           type="file"
//           id="file"
//           accept="image/*"
//           data-file={file}
//           onChange={handleChange}
//           ref={ref}
//         />
//       </label>
//       {error && <span>{error}</span>}
//     </Container>
//   );
// }
