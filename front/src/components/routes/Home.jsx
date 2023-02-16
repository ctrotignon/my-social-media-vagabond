import React, { useState, useEffect } from "react";

export default function Home() {
  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <div>
      <div className="Home">
        <div className="Home_Title">Bienvenue sur Vagabond</div>
      </div>
    </div>
  );
}
