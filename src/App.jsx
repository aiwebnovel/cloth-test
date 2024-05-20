import { useRef, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const uploadInputRef = useRef(null);

  const [imageURL, setImageURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputFiles, setInputFiles] = useState([]);
  const [token, setToken] = useState('');
  const [des, setDes] = useState('black top shirt and white short pants');

  const onChangeFileInput = async (e) => {
    setInputFiles([e.currentTarget.files[0], e.currentTarget.files[1]]);
  };

  const createMixedImage = async () => {
    setLoading(true);

    const formData1 = new FormData();

    formData1.append('file', inputFiles[0]);

    const imageOneRes = await axios.post(
      `https://api.tinytingel.ai/api/v2/user/upload-image`,
      formData1,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const formData2 = new FormData();

    formData2.append('file', inputFiles[1]);

    const imageTwoRes = await axios.post(
      `https://api.tinytingel.ai/api/v2/user/upload-image`,
      formData2,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const creatImageresponse = await axios.post(
      `https://api.tinytingel.ai/api/v2/user/cloth/create`,
      {
        garm_img: imageOneRes.data.data, // 바꿀 옷의 이미지
        human_img: imageTwoRes.data.data, // 원본 사람의 이미지
        garment_des: des, // 프롬프트
      },
    );
    setImageURL(creatImageresponse.data.data);

    setLoading(false);
  };

  const onChangeDes = (e) => {
    setDes(e.currentTarget.value);
  };

  const onChangeToken = (e) => {
    setToken(e.currentTarget.value);
  };

  return (
    <>
      {/* <button ref={buttonRef} onClick={() => {
        uploadInputRef.current.click()
       }}>이미지 업로드</button> */}

      {loading ? (
        '로딩중...'
      ) : (
        <>
          <input
            type="file"
            multiple
            ref={uploadInputRef}
            onChange={onChangeFileInput}
          />
          <div>
            <label>설명</label>
            <input type="text" onChange={onChangeDes} />
          </div>

          <div>
            <label>토큰</label>
            <input type="text" onChange={onChangeToken} />
          </div>

          <button onClick={createMixedImage}>생성하기</button>
          <img src={imageURL} />
        </>
      )}
    </>
  );
}

export default App;
