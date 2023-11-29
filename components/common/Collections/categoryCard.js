import Link from "next/link";
import { Media } from "reactstrap";

const MasterCategory = ({ img, title, link }) => {
    return (
        <div className="category-block">
            <div className="category-image border-0">
                <Media className="object-fit-cover w-100" src={img} alt={title} />
            </div>
            <div className="category-details">
                <h6 className="p-0 m-0">{title}</h6>
            </div>
        </div>
    );
};
export default MasterCategory;