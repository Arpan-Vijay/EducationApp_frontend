import { useEffect, useState } from "react";
import SideBar from "../SideBar/SideBar";
import CourseCreator from "../CourseCreator/CourseCreator";
import './CourseBuilder.css'
import axios from "axios";
import SideBarPreview from "../Preview_Component/SideBarPreview";
import CourseCreatorPreview from "../Preview_Component/CourseCreatorPreview";
import { v4 as uuidv4 } from "uuid";

const CourseBuilder = () => {
    console.log("rendering parent");

    //useParam 
    const [selectedSemId, setSelectedSemId] = useState(null);
    const [selectedChapterId, setSelectedChapterId] = useState(null);
    const [selectedSectionId, setSelectedSectionId] = useState(null);
    const [selectedQuizId, setSelectedQuizId] = useState(null);
    const [mainCourseData, setMainCourseData] = useState({ semesters: [] });
    const [showPreview, setShowPreview] = useState(false);
    const [type, setType] = useState('');

    //ids for preview components 
    const [selectedSemPreviewId, setSelectedSemPreviewId] = useState(null);
    const [selectedChapterPreviewId, setSelectedChapterPreviewId] = useState(null);
    const [selectedSectionPreviewId, setSelectedSectionPreviewId] = useState(null);
    const [selectedQuizPreviewId, setSelectedQuizPreviewId] = useState(null);
    const [previewType, setPreviewType] = useState("");

    //below state is to store the information about which slide the teacher is on so on app re-render we have the same slide 
    const [slideId, setSlideId] = useState('')

    //below state is to store information about the open dropdowns. which is passed to preview component 
    const [semesterDropdownInfo, setSemesterDropdownInfo] = useState('');
    const [chapterDropdownInfo, setChapterDropdownInfo] = useState('');

    //below state is used to execute the useEffect in course creator component which sets slidesData state when a semster is deleted.
    const [isDeleted, setIsDeleted] = useState(false);

    //to toggle sidebar
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        setMainCourseData({
            semesters: [
                {
                    id: uuidv4(),
                    name: 'Sem 1',
                    content: {
                        slides: [{ id: uuidv4(), content: [{ id: uuidv4(), type: 'Heading', data: 'Sem 1 heading' }] }]
                    },
                    chapters: [

                        {
                            id: uuidv4(),
                            name: 'chapter 1',
                            content: {
                                slides: [{ id: uuidv4(), content: [{ id: uuidv4(), type: 'Heading', data: 'Sem 1 chapter 1 heading' }] }]
                            },
                            sections: [
                                {
                                    id: uuidv4(),
                                    name: 'section 1',
                                    content: {
                                        slides: [
                                            { id: uuidv4(), content: [{ id: uuidv4(), type: 'Heading', data: 'section 1 slide 1' }] },
                                            { id: uuidv4(), content: [{ id: uuidv4(), type: 'Text', data: 'section 1 slide 2' }] },
                                        ]
                                    }
                                }
                            ],
                            chapterTest: [{ id: uuidv4(), name: "Chapter Test", numberOfQuestions: 5, timeLimit: { hours: 4, minutes: 24 }, content: { slides: [{ id: uuidv4(), content: [{ id: uuidv4(), type: 'Quiz', data: null }] }] } }]
                        },


                    ],
                    semesterTest: [{ id: uuidv4(), name: "Semester Test", numberOfQuestions: 7, timeLimit: { hours: 2, minutes: 20 }, content: { slides: [{ id: uuidv4(), content: [{ id: uuidv4(), type: 'Quiz', data: null }] }] } }]
                },

            ]
        });
    }, []);

    const handleSlectedIds = (semId, chapId, secId, quizId, type) => {
        setType(type);
        setSelectedSemId(semId);
        setSelectedChapterId(chapId);
        setSelectedSectionId(secId);
        setSelectedQuizId(quizId);
    }

    const resetSelectedIds = () => {
        setSelectedSemId(null);
        setSelectedChapterId(null);
        setSelectedSectionId(null);
        setSelectedQuizId(null);
        setType(null);
        setSlideId(null); //if not setted to null then when user deletes a sem, chap, sec. adds a new sem chap or sec and clicks on that. currentSlideId is set to the deleted slides Id.
    }

    function saveCourseData() {
        axios.post("/api/courses", mainCourseData);
    }

    function setPreviewIds() {
        setSelectedSemPreviewId(selectedSemId);
        setSelectedChapterPreviewId(selectedChapterId);
        setSelectedSectionPreviewId(selectedSectionId);
        setSelectedQuizPreviewId(selectedQuizId);
        setPreviewType(type);
    }

    const handleSlectedPreviewIds = (semId, chapId, secId, quizId, type) => {
        setSelectedSemPreviewId(semId);
        setSelectedChapterPreviewId(chapId);
        setSelectedSectionPreviewId(secId);
        setSelectedQuizPreviewId(quizId);
        setPreviewType(type);
    }

    function handleToggle() {
        setToggle(!toggle);
    }

    return (<>

        <div className="builder_container">
            <div className="toggle">
                <i onClick={handleToggle} className="fa-solid fa-bars"></i>
                {
                    showPreview ? (<div><button onClick={() => { setShowPreview((showPreview) => !showPreview) }} className="all-courses-button"><span><i class="fa-solid fa-chevron-left"></i></span> Back</button></div>)
                        : (<div><button className="all-courses-button"><span><i class="fa-solid fa-chevron-left"></i></span> All Courses</button></div>)
                }
            </div>
            {
                showPreview ? (
                    <>
                        <div className={toggle ? 'active-sidebar' : 'sidebar_container'}>
                            <div className="text-end"><i onClick={handleToggle} class="fa-solid fa-xmark hide"></i></div>
                            {
                                toggle || <div style={{ display: 'flex', justifyContent: 'center', padding: '1em', alignItems: 'center', height: '10%' }}>
                                    <button onClick={() => { setShowPreview((showPreview) => !showPreview) }} className="all-courses-button"><span><i class="fa-solid fa-chevron-left"></i></span> Back</button>
                                </div>
                            }
                            <SideBarPreview
                                handleSlectedPreviewIds={handleSlectedPreviewIds}
                                mainCourseData={mainCourseData}
                            />
                        </div>
                        <CourseCreatorPreview
                            mainCourseData={mainCourseData}
                            selectedSemPreviewId={selectedSemPreviewId}
                            selectedChapterPreviewId={selectedChapterPreviewId}
                            selectedSectionPreviewId={selectedSectionPreviewId}
                            selectedQuizPreviewId={selectedQuizPreviewId}
                            slideId={slideId}
                            previewType={previewType}
                        />
                    </>) : (
                    <>
                        <div className={toggle ? 'active-sidebar' : 'sidebar_container'}>
                           <div className="text-end"><i onClick={handleToggle} class="fa-solid fa-xmark hide"></i></div>
                            {
                                toggle || <div style={{ display: 'flex', justifyContent: 'center', padding: '1em', alignItems: 'center', height: '10%' }}>
                                    <button className="all-courses-button"><span><i class="fa-solid fa-chevron-left"></i></span> All Courses</button>
                                </div>
                            }
                            <SideBar
                                mainCourseData={mainCourseData}
                                setMainCourseData={setMainCourseData}
                                resetSelectedIds={resetSelectedIds}
                                semesterDropdownInfo={semesterDropdownInfo}
                                chapterDropdownInfo={chapterDropdownInfo}
                                setSemesterDropdownInfo={setSemesterDropdownInfo}
                                setChapterDropdownInfo={setChapterDropdownInfo}
                                handleSlectedIds={handleSlectedIds}
                                setIsDeleted={setIsDeleted}
                            />
                        </div >
                        <div className="slides-container">
                            <CourseCreator
                                mainCourseData={mainCourseData} setMainCourseData={setMainCourseData}
                                selectedChapterId={selectedChapterId}
                                selectedSectionId={selectedSectionId}
                                selectedSemId={selectedSemId}
                                resetSelectedIds={resetSelectedIds}
                                selectedQuizId={selectedQuizId}
                                setSlideId={setSlideId}
                                slideId={slideId}
                                type={type}
                                isDeleted={isDeleted}
                                showPreview={showPreview}
                                setShowPreview={setShowPreview}
                                setPreviewIds={setPreviewIds}
                            />
                        </div>
                    </>
                )
            }
        </div >
    </>
    );
}

export default CourseBuilder;