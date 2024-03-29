import { useState } from "react";
import { json, useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
    { value: "lastest", name: "최신순" },
     { value: "oldest", name: "오래된순" },
]

const filterOptionList = [
    { value: "all", name: "전부다" },
    { value: "good", name: "좋은 감정만" },
      { value: "bad", name: "안좋은 감정만" },
]

const ControlMenu = ({ value, onChange, OptionList }) => {
    return (
        <select
            className="ControlMenu"
            value={value} onChange={(e) => onChange(e.target.value)}>
            {OptionList.map((it, idx) => (
            <option key={idx} value={it.value}>
                {it.name}
            </option>
            ))}
        </select>
    )
}
const DiaryList = ({ diaryList }) => {
    const [sortType, setSortType] = useState("lastest");
    const [filter, setFilter] = useState("all");
    const navigate = useNavigate();

    const getProcessedDiaryList = () => {
        const filterCallBack = (item) => { 
            if (filter === "good") {
                return parseInt(item.emotion) <= 3;
            } else {
                return parseInt(item.emotion) > 3;
            }
        };
        
        const compare = (a, b) => {
            if (sortType === "lastest") {
                return parseInt(b.date) - parseInt(a.date);
            } else {
                return parseInt(a.date) - parseInt(b.date);
            }
        };
        //무작정 sort를 사용하면 전체 배열이 바뀌어 버리기 때문에 복사해서 사용.
        const copyList = JSON.parse(JSON.stringify(diaryList));
        const filteredList =
            filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it));
        const sortedList = filteredList.sort(compare);
        return sortedList;
    };
   
   
    return (
        <div className="DiaryList">
            <div className="menu_wrapper">
                <div className="left_col">
                     <ControlMenu
                value={sortType}
                onChange={setSortType}
                OptionList={sortOptionList}
            >
            </ControlMenu>
            <ControlMenu
                value={filter}
                onChange={setFilter}
            OptionList={filterOptionList}>
            </ControlMenu>
                </div>
                <div className="right_col">       
            <MyButton type={'positive'} text={'새 일기 쓰기'} onClick={()=>navigate('/new')}></MyButton>
                </div>
            </div>
         {getProcessedDiaryList().map((it) => (
                <DiaryItem key={it.id} {...it}></DiaryItem>
            ))}  
        </div>
    );
};

DiaryList.defaultProps = {
    diaryList: [],
};

export default DiaryList;