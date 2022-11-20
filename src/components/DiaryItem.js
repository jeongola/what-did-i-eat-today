const DiaryItem = ({ id, exercise, content, date }) => {
  return (
    <div className='DiaryItem'>
      <div className='exercise_img_wrapper'>
        <img
          alt='/'
          src={process.env.PUBLIC_URL + `assets/exercise${exercise}.png`}
          style={{ width: 110 }}
        />
      </div>
      <div></div>
      <div></div>
    </div>
  );
};

export default DiaryItem;
