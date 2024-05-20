import { useRef, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  
  const uploadInputRef = useRef(null)
  const buttonRef = useRef(null)

  const [imageURL, setImageURL] = useState('')
  const [loading, setLoading] = useState(false)

  return (
    <>
       {/* <button ref={buttonRef} onClick={() => {
        uploadInputRef.current.click()
       }}>이미지 업로드</button> */}
       
       
       {loading ? '로딩중...': <><input type="file" multiple ref={uploadInputRef} onChange={async (e) => {
        console.log(e.currentTarget.files)

        setLoading(true)
        const response = await axios.post(`https://api.tinytingel.ai/api/v2/user/cloth/create`,{
          "garm_img": "https://replicate.delivery/pbxt/KgwTlZyFx5aUU3gc5gMiKuD5nNPTgliMlLUWx160G4z99YjO/sweater.webp", // 바꿀 옷의 이미지
          "human_img": "https://replicate.delivery/pbxt/KgwTlhCMvDagRrcVzZJbuozNJ8esPqiNAIJS3eMgHrYuHmW4/KakaoTalk_Photo_2024-04-04-21-44-45.png", // 원본 사람의 이미지
          "garment_des": "blue top white short pants" // 프롬프트
      })

      console.log(response.data.data)
      setImageURL(response.data.data)
      setLoading(false)
       }}/><img src={imageURL}/></>}
    </>
  )
}

export default App
