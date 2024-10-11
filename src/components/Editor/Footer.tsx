import cn from '../../libs/cn';
import Back from '../../assets/icons/Back.svg';

interface FooterProps {
  isPostOk: boolean;
  onPost: () => void;
  onCancel: () => void;
}

export default function Footer({isPostOk, onPost, onCancel}: FooterProps) {
  
  const handlePostButton = () => {
    if (isPostOk) {
      onPost();
    } else {
      alert('제목과 내용을 입력해주세요.');
    }
  };

  return (
    <footer 
      className={cn(
        "bg-[#2B5877] flex justify-between p-2 md:p-5 w-full",
        "fixed bottom-0 left-0 h-[60px] md:h-[80px]"
      )}
    >
      <button 
        onClick={onCancel}
        className='text-white font-semibold flex items-center'
      >
        <img 
          src={Back} 
          alt="Back" 
          className="w-4 md:w-6 h-4 md:h-6 inline mr-2"
        />
        작성취소
      </button>
      <button 
        onClick={handlePostButton}
        className={cn(
          "bg-white border rounded-lg p-2",
          `${isPostOk ? 'text-[#EC6B53] border-[#EC6B53]' : 'text-gray-400 border-gray-400'}`
        )}
      >
        게시하기
      </button>
    </footer>
  );
}