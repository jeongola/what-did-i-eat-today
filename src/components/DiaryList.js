import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DiaryItem from './DiaryItem';
import MyButton from './MyButton';

const sortOptionList = [
  { value: 'latest', name: 'latest' },
  { value: 'oldest', name: 'oldest' },
];

const filterOptionList = [
  { value: 'all', name: 'all' },
  { value: 'good', name: 'Gym rat 💪🏻' },
  { value: 'bad', name: 'gained weight 😥' },
];

const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  return (
    <select className='ControlMenu' value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
});

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState('latest');
  const [filter, setFilter] = useState('all');

  const getProcessedDiaryList = () => {
    const filterCallback = (item) => {
      if (filter === 'good') {
        return parseInt(item.exercise) >= 3;
      } else {
        return parseInt(item.exercise) < 3;
      }
    };

    const compare = (a, b) => {
      if (sortType === 'latest') {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    const copyList = JSON.parse(JSON.stringify(diaryList));
    const filterdList = filter === 'all' ? copyList : copyList.filter((it) => filterCallback(it));
    const sortedList = filterdList.sort(compare);
    return sortedList;
  };

  return (
    <div className='DiaryList'>
      <div className='menu_wrapper'>
        <div className='left_col'>
          <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList} />
          <ControlMenu value={filter} onChange={setFilter} optionList={filterOptionList} />
        </div>
        <div className='right_col'>
          <MyButton type={'positive'} text={'New Diary'} onClick={() => navigate('/new')} />
        </div>
      </div>

      {getProcessedDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
