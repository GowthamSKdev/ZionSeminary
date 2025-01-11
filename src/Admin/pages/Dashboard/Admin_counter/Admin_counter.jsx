import React from 'react'
import "./Admin_counter.css"
import { Users } from 'lucide-react'



const Admin_counter = () => {
  return (
      <div className="admin_counter_list">
          <Admin_counter_card/>
          <Admin_counter_card/>
          <Admin_counter_card/>
   </div>
  )
}

export default Admin_counter

const Admin_counter_card = () => {
    return (
        <div className="admin-counter-card">
            <div className="admin-counter-icon">
                <Users/>
            </div>
            <div className="admin-counter-info">
                <div className="admin-counter-title">Total Users</div>
                <div className="admin-counter-count">10+</div>
            </div>
        </div>
    )
}