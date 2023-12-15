import Link from "next/link";
import { Media } from "reactstrap";

const MasterCategory = ({ img, title, link }) => {
    return (
        <Link href={link} className="category-block btn">
            <div className="category-image border-0">
                <Media className="object-fit-cover w-100" src={img} alt={title} />
            </div>
            <div className="category-details">
                <h6 className="p-0 m-0">{title}</h6>
            </div>
        </Link>
    );
};
export default MasterCategory;