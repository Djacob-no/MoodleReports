
/**
 * SmallCard Component
 * 
 * A reusable summary card component that displays key metrics in the dashboard.
 * Features a colored left border, an icon, title, and numeric value. Cards are
 * clickable and can trigger actions like opening modals with detailed data.
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Card title displayed above the value
 * @param {string|number} props.value - Main value/metric to display prominently
 * @param {string} props.color - Bootstrap color class (primary, success, danger, info, etc.)
 * @param {string} props.icon - FontAwesome icon name (without 'fa-' prefix)
 * @param {Function} props.onClick - Optional click handler for the entire card
 * 
 * @returns {JSX.Element} Bootstrap card with metric display and optional click behavior
 */

const SmallCard = (props) => {
  /**
   * Render a Bootstrap card with metric information
   * Uses dynamic classes for colored border and text styling
   */
  return (
    <div className="col-xl-3 col-md-6 mb-4">
      {/* 
        Card container with dynamic border color based on props.color
        Creates visual categorization (e.g., green for success, red for errors)
      */}
      <div className={`card border-left-${props.color} shadow h-100 py-2`}>
        <div className="card-body">
          {/* 
            Clickable wrapper - conditionally adds href for accessibility
            Uses "jav:" as placeholder href when onClick is provided 
          */}
          <a href={props.onClick ? "jav:" : null} onClick={props.onClick}>
            <div className="row no-gutters align-items-center">
              {/* Left column with title and value */}
              <div className="col mr-2">
                {/* 
                  Card title - small uppercase text with color matching the border
                  Uses dynamic color class for consistency 
                */}
                <div className={`text-xs font-weight-bold text-${props.color} text-uppercase mb-1`}>
                  {props.title}
                </div>
                
                {/* 
                  Main metric value - large bold text
                  ID attribute set to title for potential targeting (e.g., modal triggers)
                */}
                <div id={props.title} className="h5 mb-0 font-weight-bold text-gray-800">
                  {props.value}
                </div>
              </div>
              
              {/* Right column with FontAwesome icon */}
              <div className="col-auto">
                {/* 
                  FontAwesome icon with dynamic class name
                  Uses fa-2x for larger size and gray color for subtle appearance
                */}
                <i className={`fas fa-${props.icon} fa-2x text-gray-300`}></i>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SmallCard;


