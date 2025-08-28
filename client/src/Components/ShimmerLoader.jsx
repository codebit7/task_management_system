import React from 'react';
import '../Styles/Shimmer.css';

export const TaskCardSkeleton = () => {
  return (
    <div className="task-card-skeleton">

      <div className="shimmer-wrapper">

        <div className="task-header-skeleton">
        <div className="task-title-skeleton">
             <div className="shimmer-line title-line"></div>
            <div className="shimmer-circle"></div>
          </div>
          <div className="task-desc-skeleton">

              <div className="shimmer-line desc-line-1"></div>
              <div className="shimmer-line desc-line-2"></div>
              <div className="shimmer-line desc-line-3"></div>
          </div>
        </div>
        
        <div className="task-footer-skeleton">
          
           <div className="shimmer-line date-line"></div>
          <div className="shimmer-pill priority-pill"></div>
          
          <div className="icons-skeleton">
            <div className="shimmer-circle small"></div>
            <div className="shimmer-circle small"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TaskListSkeleton = () => {
  return (
    <>
      <div className='task_list_header'>
        <div className="shimmer-line header-title"></div>
        <div className="task_filters">
          <ul>
            {[1, 2, 3, 4].map((i) => (
              <li key={i} className="filter-skeleton">
                <div className="shimmer-pill filter-pill"></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="task-list">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <TaskCardSkeleton key={i} />
        ))}
        <div className="add-task-skeleton">
          <div className="shimmer-line add-task-line"></div>
        </div>
      </div>
    </>
  );
};



export const DashboardSkeleton = () => {
  return (
    <div className="dashboard-skeleton">
      <div className="dashboard-header-skeleton">
        <div className="shimmer-line dashboard-title"></div>
      </div>
      <div className="dashboard-content-skeleton">
        <div className="chart-skeleton">
          <div className="shimmer-rect chart-rect"></div>
        </div>
        <div className="stats-grid-skeleton">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="stat-card-skeleton">
              <div className="shimmer-line stat-card-title"></div>
              <div className="shimmer-circle stat-card-number"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};