import Image from "next/image";
import React from "react";
import { fetchTeamMembers } from "@/utils/team";

export default async function Team() {
  const teamMembers = await fetchTeamMembers();


  // Access the data array from the response
  const members = teamMembers?.data || [];

  return (
    <section className="layout-pt-xl">
      <div className="container">
        <div className="row">
          <div className="col-auto">
            <h2 className="text-30">Meet Our Team</h2>
          </div>
        </div>

        <div className="row y-gap-30 pt-40 sm:pt-20">
          {members.map((elm, i) => (
            <div key={i} className="col-lg-2 col-md-3 col-sm-4">
              <div className="ratio ratio-1:1">
                <Image
                  width={200}
                  height={200}
                  src={elm.profile_picture}
                  alt="image"
                  className="img-ratio bg-light-1 rounded-12"
                />
              </div>

              <h3 className="text-14 fw-500 mt-15">{elm.full_name}</h3>
              <p className="text-12 lh-16">{elm.position}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
