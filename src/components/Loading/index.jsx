import React from "react";
import 'bootstrap/dist/css/bootstrap.css';

export default function Loading() {
  return (
    <div class="d-flex justify-content-center">
      <div class="spinner-border text-primary m-5" role="status">
      </div>
    </div>
  )
}