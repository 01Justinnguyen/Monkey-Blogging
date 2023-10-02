import {} from 'react'

const DashboardHeading = ({ title = '', desc = '', children }) => {
  return (
    <div className="flex items-center justify-between mb-10">
      <div>
        <h1 className="dashboard-heading">{title}</h1>
        <p className="dashboard-short-desc">{desc}</p>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default DashboardHeading
