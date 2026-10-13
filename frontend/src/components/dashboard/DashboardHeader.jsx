import React from "react";

import "./DashboardHeader.css";

export default function DashboardHeader(){

return(

<div className="dashboard-header">

<div>

<h1>

Welcome Back 👋

</h1>

<p>

Here's what's happening with your inventory today.

</p>

</div>

<div className="dashboard-buttons">

<button className="primary-btn">

+ Add Product

</button>

<button className="secondary-btn">

Generate Report

</button>

</div>

</div>

)

}