import { useDraggable } from "@dnd-kit/core";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css"
// import {FaHeading} from 'react-icons/fa';

export default function Video(props) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: 'Video',
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <div ref={setNodeRef} className="draggable" data-tooltip-id="my-tooltip"
        data-tooltip-content="Drag to add video content"
        data-tooltip-place="top" style={style} {...listeners} {...attributes}>
            <i className="fa-solid fa-video"></i>
            <p>Video</p>
            <Tooltip id="my-tooltip" />
        </div>

        // <FaHeading   ref={setNodeRef} style={style}  {...listeners} {...attributes}/>
    )
} 