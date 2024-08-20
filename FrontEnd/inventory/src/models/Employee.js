import PropTypes from 'prop-types';
export const profilePropTypes = {
    item: PropTypes.shape({
      dataItem: PropTypes.shape({
        profile: PropTypes.shape({
          name: PropTypes.string.isRequired,
          lastName: PropTypes.string.isRequired,
          cc: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
          email: PropTypes.string.isRequired,
          phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
          eps: PropTypes.string.isRequired,
          sex: PropTypes.string,
        }).isRequired,
        area: PropTypes.string.isRequired,
        admissionDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
        position: PropTypes.string.isRequired,
        shift: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };