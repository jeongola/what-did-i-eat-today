const ExerciseItem = ({ isselected, onClick, exercise_id, exercise_descript, exercise_img }) => {
  return (
    <div
      onClick={() => onClick(exercise_id)}
      className={[
        'ExerciseItem',
        isselected ? `ExerciseItem_on_${exercise_id}` : `ExerciseItem_off`,
      ].join(' ')}>
      <img alt='/' src={exercise_img} style={{ width: 80 }} />
      <span>{exercise_descript}</span>
    </div>
  );
};

export default ExerciseItem;
