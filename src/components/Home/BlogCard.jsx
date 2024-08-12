import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const BlogCard = (props) => {
  const { blog } = props;
  return (
    <div className="card">
      <img alt={blog.title} src={blog.imageUrl} />
      <div className="card-body">
        <h5 className="card-title">{blog.title}</h5>
        <div className="text-end">
          <Link className="btn btn-dark" to={`/details/${blog.id}`}>
            <i className="bi bi-arrow-up-right me-2"></i>Ir
          </Link>
        </div>
      </div>
    </div>
  );
};
export default BlogCard;
BlogCard.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }),
  index: PropTypes.number.isRequired,
};
