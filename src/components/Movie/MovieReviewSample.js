import React, { useState, useRef } from "react";

function MovieReviewSample() {

  const [lists] = useState([
    {
      name : "김철수",
      contents : "좋아요."
    },
    {
      name : "최영희",
      contents : "최고에요."
    },
    {
      name : "바카스",
      contents : "최고에요."
    }
  ]);

  const { name, contents } = lists;

  const listing = lists.map(function(one){ return (
    <div className="ReviewData">
      <h4>{one.name}</h4>
      <p>{one.contents}</p>
    </div> )});

  return (
    <div> {listing} </div>
  );
}

export default MovieReviewSample;
