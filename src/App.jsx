import { useRef, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const uploadInputClothRef = useRef(null);
  const uploadInputHumanRef = useRef(null);
  const uploadClothImagebuttonRef = useRef(null);
  const uploadHumanImagebuttonRef = useRef(null);

  const [imageURL, setImageURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputClothFiles, setInputClothFiles] = useState('');
  const [inputHumanFiles, setInputHumanFiles] = useState('');
  const [des, setDes] = useState('black top shirt and white short pants');

  const onChangeClothFileInput = async (e) => {
    setInputClothFiles(e.currentTarget.files[0]);
  };

  const onChangeHumanFileInput = async (e) => {
    setInputHumanFiles(e.currentTarget.files[0]);
  };

  const createMixedImage = async () => {
    setLoading(true);

    const formData1 = new FormData();

    formData1.append('file', inputClothFiles);

    const imageOneRes = await axios.post(
      `https://api.tinytingel.ai/api/v2/user/cloth/upload-image`,
      formData1,
    );

    const formData2 = new FormData();

    formData2.append('file', inputHumanFiles);

    const imageTwoRes = await axios.post(
      `https://api.tinytingel.ai/api/v2/user/cloth/upload-image`,
      formData2,
    );

    const creatImageresponse = await axios.post(
      `https://api.tinytingel.ai/api/v2/user/cloth/create`,
      {
        garm_img: imageOneRes.data.data, // 바꿀 옷의 이미지
        human_img: imageTwoRes.data.data, // 원본 사람의 이미지
        garment_des: des, // 프롬프트
      },
      { timeout: 86400000 },
    );
    setImageURL(creatImageresponse.data.data);

    setLoading(false);
  };

  const onChangeDes = (e) => {
    setDes(e.currentTarget.value);
  };

  return (
    <>
      <button
        ref={uploadClothImagebuttonRef}
        onClick={() => {
          uploadInputClothRef.current.click();
        }}
      >
        옷 이미지 업로드 하기
      </button>
      <button
        ref={uploadHumanImagebuttonRef}
        onClick={() => {
          uploadInputHumanRef.current.click();
        }}
      >
        사람 이미지 업로드 하기
      </button>

      {loading ? (
        '로딩중...'
      ) : (
        <>
          <input
            type="file"
            ref={uploadInputClothRef}
            onChange={onChangeClothFileInput}
            style={{ width: 0, height: 0 }}
          />
          <input
            type="file"
            ref={uploadInputHumanRef}
            onChange={onChangeHumanFileInput}
            style={{ width: 0, height: 0 }}
          />
          <div>
            <label>설명</label>
            <input type="text" onChange={onChangeDes} />
          </div>

          <button onClick={createMixedImage}>생성하기</button>
          <img src={imageURL} />
        </>
      )}
    </>
  );
}

export default App;
