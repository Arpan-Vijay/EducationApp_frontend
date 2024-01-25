import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuidv4 } from "uuid";
import MyModal from "./MyModal";

import "./SideBar.css";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";
import AddModal from "./Modals/AddModal";

const SideBar = ({
  mainCourseData,
  setMainCourseData,
  resetSelectedIds,
  semesterDropdownInfo,
  chapterDropdownInfo,
  setSemesterDropdownInfo,
  setChapterDropdownInfo,
  handleSlectedIds,
  setIsDeleted,
}) => {
  //console.log("rendering child sidebar");
  // modal states
  const [addShow, setAddShow] = useState(false);
  const handleAddShow = () => setAddShow(true);
  const handleAddClose = () => setAddShow(false);

  //below state is used to store semester name input from user and the adding semester takes that name
  const [semesterName, setSemesterName] = useState("");
  const [chapterName, setChapterName] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [quizName, setQuizName] = useState("");

  //below states store the semester or chapter id then match those to open or close the dropdowns
  const [semesterDropdown, setSemesterDropdown] = useState("");
  const [chapterDropdown, setChapterDropdown] = useState("");

  //below state is used to store the id of either one of sem, chap, sec , test then based on id we show edit or delete icons
  const [isHovering, setIsHovering] = useState("");

  //below state is used to show user appropriate errors
  const [error, setError] = useState(false);
  //below state stored the sectionId and matches that id to change background color of selected section. Also used for changing bg-color of selected chapterTest
  const [currentSection, setCurrentSection] = useState("");

  const [showModal, setShowModal] = useState({
    semId: "",
    chapId: "",
    secId: "",
    chapTestId: "",
    semTestId: "",
    semIndex: "",
    chapIndex: "",
    type: "",
    show: false,
    action: "",
    title: "",
    name: "",
  });

  //state variable to store the users input then on click of update button we change the semesters state
  //same state variable will be used to update sem name , chap name , section name.
  const [newName, setNewName] = useState("");
  //const {semesterId , chapterId , sectionId } = useparams();

  //below useEffect sets parents variable that is passed to preview so the dropdowns should be open in preview as well
  useEffect(() => {
    setSemesterDropdownInfo(semesterDropdown);
  }, [semesterDropdown]);

  useEffect(() => {
    setChapterDropdownInfo(chapterDropdown);
  }, [chapterDropdown]);

  useEffect(() => {
    if (semesterDropdownInfo === "") {
      return;
    } else {
      setSemesterDropdown(semesterDropdownInfo);
    }
  }, []);

  //below useEffect checks for dropdown info for chapter.
  useEffect(() => {
    if (chapterDropdownInfo === "") {
      return;
    } else {
      setChapterDropdown(chapterDropdownInfo);
    }
  }, []);

  //make a word document for the component also start styling this also domo knowledge required.

  const addSemester = () => {
    if (!semesterName) {
      setError(true);
      return;
    }
    setError(false);
    const newSemesterObj = {
      id: uuidv4(),
      name: semesterName,
      content: null,
      chapters: [],
      semesterTest: [],
    };
    const newSemesters = [...mainCourseData.semesters];
    newSemesters.push(newSemesterObj);
    setMainCourseData({ semesters: newSemesters });
    setSemesterName("");
    setShowModal((showModal) => {
      return { ...showModal, show: false };
    });
  };

  function addChapter(semIndex) {
    if (!chapterName) {
      setError(true);
      return;
    }
    const newChapter = {
      id: uuidv4(),
      name: chapterName,
      content: null,
      sections: [],
      chapterTest: [],
    };

    const newSemesters = [...mainCourseData.semesters];
    newSemesters[semIndex].chapters.push(newChapter);
    setMainCourseData({ semesters: newSemesters });
    setChapterName("");
    setShowModal((showModal) => {
      return { ...showModal, show: false };
    });
    setError(false);
  }

  function addSection(semIndex, chapIndex) {
    if (!sectionName) {
      setError(true);
      return;
    }
    const newSection = {
      id: uuidv4(),
      name: sectionName,
      content: null,
    };

    const newSemesters = [...mainCourseData.semesters];
    newSemesters[semIndex].chapters[chapIndex].sections.push(newSection);
    setMainCourseData({ semesters: newSemesters });
    setSectionName("");
    setShowModal((showModal) => {
      return { ...showModal, show: false };
    });
    setError(false);
  }

  function addSectionLevelQuiz(semIndex, chapIndex) {
    if (!quizName) {
      setError(true);
      return;
    }
    const newQuiz = {
      id: uuidv4(),
      name: quizName,
      numberOfQuestions: null,
      timeLimit: null,
      content: {
        slides: [
          {
            id: uuidv4(),
            content: [{ id: uuidv4(), type: "Quiz", data: null }],
          },
        ],
      },
    };

    const newSemesters = [...mainCourseData.semesters];
    newSemesters[semIndex].chapters[chapIndex].chapterTest.push(newQuiz);
    setMainCourseData({ semesters: newSemesters });
    setQuizName("");
    setShowModal((showModal) => {
      return { ...showModal, show: false };
    });
    setError(false);
  }

  function addQuizBelowChapters(semIndex) {
    if (!quizName) {
      setError(true);
      return;
    }
    const quizObj = {
      id: uuidv4(),
      name: quizName,
      numberOfQuestions: null,
      timeLimit: null,
      content: {
        slides: [
          {
            id: uuidv4(),
            content: [{ id: uuidv4(), type: "Quiz", data: null }],
          },
        ],
      },
    };
    const newSemesters = [...mainCourseData.semesters];
    newSemesters[semIndex].semesterTest.push(quizObj);
    setMainCourseData({ semesters: newSemesters });
    setQuizName("");
    setShowModal((showModal) => {
      return { ...showModal, show: false };
    });
    setError(false);
  }

  function deleteSemester(semId) {
    const newSemesters = [...mainCourseData.semesters];
    setMainCourseData({
      semesters: newSemesters.filter((semester) => semester.id !== semId),
    });
    setIsDeleted((isDeleted) => !isDeleted);
    setShowModal((showModal) => {
      return { ...showModal, show: false };
    });
  }

  function editSemesterName(semId) {
    if (!newName) {
      setError(true);
      return;
    }
    setMainCourseData({
      semesters: mainCourseData.semesters.map((semester) => {
        if (semester.id === semId) {
          return {
            ...semester,
            name: newName,
          };
        } else {
          return {
            ...semester,
          };
        }
      }),
    });
    setShowModal((showModal) => {
      return { ...showModal, show: false };
    });
    setError(false);
    setNewName("");
  }

  function deleteChapter(semId, chapId) {
    setMainCourseData({
      semesters: mainCourseData.semesters.map((semester) => {
        if (semester.id === semId) {
          return {
            ...semester,
            chapters: semester.chapters.filter(
              (chapter) => chapter.id !== chapId
            ),
          };
        } else {
          return {
            ...semester,
          };
        }
      }),
    });
    setShowModal((showModal) => {
      return { ...showModal, show: false };
    });
    setIsDeleted((isDeleted) => !isDeleted);
  }

  function deleteSection(semId, chapId, sectionId) {
    setMainCourseData({
      semesters: mainCourseData.semesters.map((semester) => {
        if (semester.id === semId) {
          return {
            ...semester,
            chapters: semester.chapters.map((chapter) => {
              if (chapter.id === chapId) {
                return {
                  ...chapter,
                  sections: chapter.sections.filter(
                    (section) => section.id !== sectionId
                  ),
                };
              } else {
                return {
                  ...chapter,
                };
              }
            }),
          };
        } else {
          return {
            ...semester,
          };
        }
      }),
    });
    setIsDeleted((isDeleted) => !isDeleted);
    setShowModal((showModal) => {
      return { ...showModal, show: false };
    });
  }

  function editChapterName(semId, chapId) {
    if (!newName) {
      setError(true);
      return;
    }
    setMainCourseData({
      semesters: mainCourseData.semesters.map((semester) => {
        if (semester.id === semId) {
          return {
            ...semester,
            chapters: [
              ...semester.chapters.map((chapter) => {
                if (chapter.id === chapId) {
                  return {
                    ...chapter,
                    name: newName,
                  };
                } else {
                  return {
                    ...chapter,
                  };
                }
              }),
            ],
          };
        } else {
          return {
            ...semester,
          };
        }
      }),
    });
    setShowModal((showModal) => {
      return { ...showModal, show: false };
    });
    setNewName("");
    setError(false);
  }

  function editSectionName(semId, chapId, sectionId) {
    if (!newName) {
      setError(true);
      return;
    }
    setMainCourseData({
      semesters: mainCourseData.semesters.map((semester) => {
        if (semester.id === semId) {
          return {
            ...semester,
            chapters: semester.chapters.map((chapter) => {
              if (chapter.id === chapId) {
                return {
                  ...chapter,
                  sections: chapter.sections.map((section) => {
                    if (section.id === sectionId) {
                      return {
                        ...section,
                        name: newName,
                      };
                    } else {
                      return {
                        ...section,
                      };
                    }
                  }),
                };
              } else {
                return {
                  ...chapter,
                };
              }
            }),
          };
        } else {
          return {
            ...semester,
          };
        }
      }),
    });
    setError(false);
    setShowModal((showModal) => {
      return { ...showModal, show: false };
    });
  }

  function editChapterLevelQuizName(semId, quizId) {
    if (!newName) {
      setError(true);
      return;
    }
    setMainCourseData({
      semesters: mainCourseData.semesters.map((semester) => {
        if (semester.id === semId) {
          return {
            ...semester,
            semesterTest: semester.semesterTest.map((q) => {
              if (q.id === quizId) {
                return {
                  ...q,
                  name: newName,
                };
              } else {
                return {
                  ...q,
                };
              }
            }),
          };
        } else {
          return {
            ...semester,
          };
        }
      }),
    });
    setShowModal((showModal) => {
      return { ...showModal, show: false };
    });
    setNewName("");
    setError(false);
  }

  function editQuizName(semId, chapId, quizId) {
    if (!newName) {
      setError(true);
      return;
    }
    setMainCourseData({
      semesters: mainCourseData.semesters.map((semester) => {
        if (semester.id === semId) {
          return {
            ...semester,
            chapters: semester.chapters.map((chapter) => {
              if (chapter.id === chapId) {
                return {
                  ...chapter,
                  chapterTest: chapter.chapterTest.map((q) => {
                    if (q.id === quizId) {
                      return {
                        ...q,
                        name: newName,
                      };
                    } else {
                      return {
                        ...q,
                      };
                    }
                  }),
                };
              } else {
                return {
                  ...chapter,
                };
              }
            }),
          };
        } else {
          return {
            ...semester,
          };
        }
      }),
    });
    setShowModal((showModal) => {
      return { ...showModal, show: false };
    });
    setNewName("");
    setError(false);
  }

  function deleteChapterLevelQuiz(semId, quizId) {
    setMainCourseData({
      semesters: mainCourseData.semesters.map((semester) => {
        if (semester.id === semId) {
          return {
            ...semester,
            semesterTest: semester.semesterTest.filter((q) => q.id !== quizId),
          };
        } else {
          return {
            ...semester,
          };
        }
      }),
    });
    setIsDeleted((isDeleted) => !isDeleted);
    setShowModal((showModal) => {
      return { ...showModal, show: false };
    });
  }

  function deleteSectionLevelQuiz(semId, chapId, quizId) {
    setMainCourseData({
      semesters: mainCourseData.semesters.map((semester) => {
        if (semester.id === semId) {
          return {
            ...semester,
            chapters: semester.chapters.map((chapter) => {
              if (chapter.id === chapId) {
                return {
                  ...chapter,
                  chapterTest: chapter.chapterTest.filter(
                    (q) => q.id !== quizId
                  ),
                };
              } else {
                return {
                  ...chapter,
                };
              }
            }),
          };
        } else {
          return {
            ...semester,
          };
        }
      }),
    });
    setIsDeleted((isDeleted) => !isDeleted);
    setShowModal((showModal) => {
      return { ...showModal, show: false };
    });
  }

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log("totally custom!")
    );

    return (
      <button
        type="button"
        style={{ border: "none", backgroundColor: "#f8f9fa", padding: "0" }}
        onClick={decoratedOnClick}
      >
        <i className="fa-solid fa-caret-down"></i>
      </button>
    );
  }
  //sub branch
  return (
    <>
      {/* <AddModal addShow={addShow} handleClose={handleAddClose}/> */}

      <div style={{ overflowX: "hidden", overflowY: "auto", height: "90%" }}>
        {
          <MyModal
            showModal={showModal}
            setShowModal={setShowModal}
            setSemesterName={setSemesterName}
            semesterName={semesterName}
            chapterName={chapterName}
            setChapterName={setChapterName}
            sectionName={sectionName}
            setSectionName={setSectionName}
            quizName={quizName}
            setQuizName={setQuizName}
            newName={newName}
            setNewName={setNewName}
            error={error}
            setError={setError}
            addSemester={addSemester}
            editSemesterName={editSemesterName}
            deleteSemester={deleteSemester}
            addChapter={addChapter}
            editChapterName={editChapterName}
            deleteChapter={deleteChapter}
            addSection={addSection}
            editSectionName={editSectionName}
            deleteSection={deleteSection}
            addSectionLevelQuiz={addSectionLevelQuiz}
            editChapterLevelQuizName={editChapterLevelQuizName}
            deleteSectionLevelQuiz={deleteSectionLevelQuiz}
            addQuizBelowChapters={addQuizBelowChapters}
            editQuizName={editQuizName}
            deleteChapterLevelQuiz={deleteChapterLevelQuiz}
          ></MyModal>
        }
        <Accordion>
          {mainCourseData.semesters.map((semester, semIndex) => (
            <Card>
              <Card.Header>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  onMouseEnter={() => {
                    setIsHovering(semester.id);
                  }}
                  onMouseLeave={() => {
                    setIsHovering(null);
                  }}
                  title={`${semester.name}`}
                >
                  <label
                    onClick={() => {
                      handleSlectedIds(
                        semester.id,
                        null,
                        null,
                        null,
                        "semesters"
                      );
                    }}
                    style={{
                      cursor: "pointer",
                      maxWidth: "70%",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {semester.name}
                  </label>
                  <span>
                    {isHovering === semester.id && (
                      <i
                        className="fa-solid fa-pen me-2"
                        onClick={() =>
                          setShowModal((showModal) => {
                            return {
                              ...showModal,
                              semId: semester.id,
                              type: "semester",
                              action: "edit",
                              show: true,
                              title: `Edit Semester Name`,
                              name: semester.name,
                            };
                          })
                        }
                        style={{ cursor: "pointer" }}
                      ></i>
                    )}
                    {isHovering === semester.id && (
                      <i
                        className="fa-regular fa-circle-xmark me-2"
                        onClick={() =>
                          setShowModal((showModal) => {
                            return {
                              ...showModal,
                              semId: semester.id,
                              type: "semester",
                              action: "delete",
                              show: true,
                              title: "delete semseter",
                              name: semester.name,
                            };
                          })
                        }
                        style={{ cursor: "pointer", marginRight: "3px" }}
                      ></i>
                    )}
                    <CustomToggle eventKey={`${semIndex}`} />
                  </span>
                </div>
              </Card.Header>
              <Accordion.Collapse eventKey={`${semIndex}`}>
                <Card.Body className="testing">
                  <Accordion>
                    {semester.chapters.map((chapter, chapIndex) => (
                      <Card className="rounded-3">
                        <Card.Header>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                            onMouseEnter={() => {
                              setIsHovering(chapter.id);
                            }}
                            onMouseLeave={() => {
                              setIsHovering(null);
                            }}
                            title={`${chapter.name}`}
                          >
                            <label
                              onClick={() => {
                                handleSlectedIds(
                                  semester.id,
                                  chapter.id,
                                  null,
                                  null,
                                  "chapters"
                                );
                              }}
                              style={{
                                cursor: "pointer",
                                maxWidth: "63%",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {chapter.name}
                            </label>
                            <span>
                              {isHovering === chapter.id && (
                                <i
                                  className="fa-solid fa-pen me-2"
                                  onClick={() =>
                                    setShowModal((showModal) => {
                                      return {
                                        ...showModal,
                                        semId: semester.id,
                                        chapId: chapter.id,
                                        action: "edit",
                                        type: "chapter",
                                        name: chapter.name,
                                        show: true,
                                        title: "Edit Chapter",
                                      };
                                    })
                                  }
                                  style={{ cursor: "pointer" }}
                                ></i>
                              )}
                              {isHovering === chapter.id && (
                                <i
                                  className="fa-regular fa-circle-xmark me-2"
                                  onClick={() =>
                                    setShowModal((showModal) => {
                                      return {
                                        ...showModal,
                                        semId: semester.id,
                                        chapId: chapter.id,
                                        type: "chapter",
                                        action: "delete",
                                        show: true,
                                        title: "Delete Chapter",
                                        name: chapter.name,
                                      };
                                    })
                                  }
                                  style={{
                                    cursor: "pointer",
                                    marginRight: "3px",
                                  }}
                                ></i>
                              )}
                              <CustomToggle eventKey={`${chapIndex}`}>
                                Click me!
                              </CustomToggle>
                            </span>
                          </div>
                        </Card.Header>
                        <Accordion.Collapse eventKey={`${chapIndex}`}>
                          <Card.Body className="testing-2">
                            {chapter.sections.map((section, secIndex) => (
                              <Card className="mb-2">
                                <Card.Header>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignContent: "center",
                                    }}
                                    onMouseEnter={() => {
                                      setIsHovering(section.id);
                                    }}
                                    onMouseLeave={() => {
                                      setIsHovering(null);
                                    }}
                                    className=""
                                    title={section.name}
                                  >
                                    <label
                                      onClick={() => {
                                        handleSlectedIds(
                                          semester.id,
                                          chapter.id,
                                          section.id,
                                          null,
                                          "sections"
                                        );
                                        setCurrentSection(section.id);
                                      }}
                                      style={{
                                        cursor: "pointer",
                                        maxWidth: "63%",
                                        textOverflow: "ellipsis",
                                        overflow: "hidden",
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      {section.name}
                                    </label>

                                    <span>
                                      {isHovering === section.id && (
                                        <i
                                          className="fa-solid fa-pen me-2"
                                          onClick={() =>
                                            setShowModal((showModal) => {
                                              return {
                                                ...showModal,
                                                semId: semester.id,
                                                chapId: chapter.id,
                                                secId: section.id,
                                                name: section.name,
                                                type: "section",
                                                action: "edit",
                                                show: true,
                                                title: "Edit Section",
                                              };
                                            })
                                          }
                                          style={{ cursor: "pointer" }}
                                        ></i>
                                      )}
                                      {isHovering === section.id && (
                                        <i
                                          className="fa-regular fa-circle-xmark me-2"
                                          onClick={() =>
                                            setShowModal((showModal) => {
                                              return {
                                                ...showModal,
                                                semId: semester.id,
                                                chapId: chapter.id,
                                                secId: section.id,
                                                name: section.name,
                                                type: "section",
                                                action: "delete",
                                                show: true,
                                                title: "Delete Section",
                                              };
                                            })
                                          }
                                          style={{
                                            cursor: "pointer",
                                            marginRight: "3px",
                                          }}
                                        ></i>
                                      )}
                                    </span>
                                  </div>
                                </Card.Header>
                              </Card>
                            ))}
                            {chapter.chapterTest.map((q) => (
                              <Card className="mb-2">
                                <Card.Header>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignContent: "center",
                                    }}
                                    onMouseEnter={() => {
                                      setIsHovering(q.id);
                                    }}
                                    onMouseLeave={() => {
                                      setIsHovering(null);
                                    }}
                                    className=""
                                    title={`${q.name}`}
                                  >
                                    <label
                                      onClick={() => {
                                        handleSlectedIds(
                                          semester.id,
                                          chapter.id,
                                          null,
                                          q.id,
                                          "chapterTest"
                                        );
                                        setCurrentSection(q.id);
                                      }}
                                      style={{
                                        cursor: "pointer",
                                        maxWidth: "63%",
                                        textOverflow: "ellipsis",
                                        overflow: "hidden",
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      {q.name}
                                    </label>

                                    <span>
                                      {isHovering === q.id && (
                                        <i
                                          className="fa-solid fa-pen me-2"
                                          onClick={() =>
                                            setShowModal((showModal) => {
                                              return {
                                                ...showModal,
                                                chapTestId: q.id,
                                                semId: semester.id,
                                                chapId: chapter.id,
                                                name: q.name,
                                                type: "chapTest",
                                                action: "edit",
                                                show: true,
                                                title: "Edit Test",
                                              };
                                            })
                                          }
                                          style={{ cursor: "pointer" }}
                                        ></i>
                                      )}
                                      {isHovering === q.id && (
                                        <i
                                          className="fa-regular fa-circle-xmark me-2"
                                          onClick={() =>
                                            setShowModal((showModal) => {
                                              return {
                                                ...showModal,
                                                chapTestId: q.id,
                                                semId: semester.id,
                                                chapId: chapter.id,
                                                name: q.name,
                                                type: "chapTest",
                                                action: "delete",
                                                show: true,
                                                title: "Delete Test",
                                              };
                                            })
                                          }
                                          style={{
                                            cursor: "pointer",
                                            marginRight: "3px",
                                          }}
                                        ></i>
                                      )}
                                    </span>
                                  </div>
                                </Card.Header>
                              </Card>
                            ))}
                            <div>
                              <div className="row gx-1 d-flex justify-content-evenly py-2">
                                <button
                                  className="btn btn-primary col-5  text-nowrap add-buttons"
                                  onClick={() => {
                                    setShowModal({
                                      ...showModal,
                                      semIndex: semIndex,
                                      chapIndex: chapIndex,
                                      type: "section",
                                      action: "add",
                                      show: true,
                                      title: "Add Section",
                                    });
                                  }}
                                >
                                  + Section
                                </button>
                                <button
                                  className="btn btn-success col-5  text-nowrap add-buttons"
                                  onClick={() => {
                                    setShowModal({
                                      ...showModal,
                                      semIndex: semIndex,
                                      chapIndex: chapIndex,
                                      type: "chapTest",
                                      action: "add",
                                      show: true,
                                      title: "Add Test",
                                    });
                                  }}
                                >
                                  + Test
                                </button>
                              </div>
                            </div>
                            {/* <div >
                                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2px 0px' }}>
                                                                        <span>Add Section</span><i style={{ marginLeft: "7px", cursor: 'pointer' }} onClick={() => { setShowModal({ ...showModal, semIndex: semIndex, chapIndex: chapIndex, type: 'section', action: 'add', show: true, title: 'Add Section' }) }} className="fa-solid fa-plus"></i>
                                                                    </div>
                                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2px 0px' }}>
                                                                        <span>Add Test</span><i style={{ marginLeft: "7px", cursor: 'pointer' }} onClick={() => { setShowModal({ ...showModal, semIndex: semIndex, chapIndex: chapIndex, type: 'chapTest', action: 'add', show: true, title: 'Add Test' }) }} className="fa-solid fa-plus"></i>
                                                                    </div>

                                                                </div> */}
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    ))}
                  </Accordion>
                  {semester.semesterTest.map((q) => (
                    <Card className="mb-2">
                      <Card.Header>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                          onMouseEnter={() => {
                            setIsHovering(q.id);
                          }}
                          onMouseLeave={() => {
                            setIsHovering(null);
                          }}
                          title={q.name}
                        >
                          <label
                            onClick={() => {
                              handleSlectedIds(
                                semester.id,
                                null,
                                null,
                                q.id,
                                "semesterTest"
                              );
                            }}
                            style={{
                              cursor: "pointer",
                              maxWidth: "63%",
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {q.name}
                          </label>
                          <span>
                            {isHovering === q.id && (
                              <i
                                className="fa-solid fa-pen me-2"
                                onClick={() =>
                                  setShowModal((showModal) => {
                                    return {
                                      ...showModal,
                                      type: "semTest",
                                      action: "edit",
                                      semId: semester.id,
                                      semTestId: q.id,
                                      show: true,
                                      title: "Edit Test",
                                    };
                                  })
                                }
                                style={{ cursor: "pointer" }}
                              ></i>
                            )}
                            {isHovering === q.id && (
                              <i
                                className="fa-regular fa-circle-xmark me-2"
                                onClick={() =>
                                  setShowModal((showModal) => {
                                    return {
                                      ...showModal,
                                      type: "semTest",
                                      action: "delete",
                                      semId: semester.id,
                                      semTestId: q.id,
                                      show: true,
                                      title: "Delete Test",
                                    };
                                  })
                                }
                                style={{
                                  cursor: "pointer",
                                  marginRight: "3px",
                                }}
                              ></i>
                            )}
                          </span>
                        </div>
                      </Card.Header>
                    </Card>
                  ))}
                  <div>
                    <div className="row gx-1 d-flex justify-content-evenly py-2">
                      <button
                        className="btn btn-primary col-5  text-nowrap add-buttons"
                        onClick={() => {
                          setShowModal({
                            ...showModal,
                            semIndex: semIndex,
                            show: true,
                            type: "chapter",
                            action: "add",
                            title: "Add Chapter",
                          });
                        }}
                      >
                        + Chapter
                      </button>
                      <button
                        className="btn btn-success col-5  text-nowrap add-buttons"
                        onClick={() => {
                          setShowModal({
                            ...showModal,
                            semIndex: semIndex,
                            show: true,
                            type: "semTest",
                            action: "add",
                            title: "Add Test",
                          });
                        }}
                      >
                        + Test
                      </button>
                    </div>
                  </div>
                  {/* <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0px 7px' }}>
                                                <span>Add Chapter</span><i style={{ marginLeft: "7px", cursor: 'pointer' }} onClick={() => { setShowModal({ ...showModal, semIndex: semIndex, show: true, type: 'chapter', action: 'add', title: 'Add Chapter' }) }} className="fa-solid fa-plus"></i>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0px  7px' }}>
                                                <span>Add Test</span><i style={{ marginLeft: "7px", cursor: 'pointer' }} onClick={() => { setShowModal({ ...showModal, semIndex: semIndex, show: true, type: 'semTest', action: 'add', title: 'Add Test' }) }} className="fa-solid fa-plus"></i>
                                            </div>

                                        </div> */}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          ))}
        </Accordion>
        <div className="row gx-1 d-flex justify-content-evenly py-2">
          <button
            onClick={() => {
              setShowModal({
                ...showModal,
                type: "semester",
                action: "add",
                show: true,
                title: "Add Semester",
              });
            }}
            className="btn btn-primary col-5  text-nowrap add-buttons"
          >
            + Semester
          </button>
        </div>
        {/* <div className="add-semester-button-container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0px 10px' }}>
                        <span>Add Semester</span><i style={{ cursor: 'pointer' }} onClick={() => { setShowModal({ ...showModal, type: 'semester', action: 'add', show: true, title: 'Add Semester' }) }} className="fa-solid fa-plus highlight"></i>
                    </div>
                </div> */}
      </div>
    </>
  );
};

export default SideBar;
