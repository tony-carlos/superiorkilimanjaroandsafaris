import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function Information() {
  return (
    <section className="layout-pt-lg layout-pb-lg bg-light-1">
      <div className="container">
        <div className="row justify-center">
          <div className="col-xl-10">
            <div className="sectionTitle text-center">
              <h2 className="sectionTitle__title text-dark-1">Our Story</h2>
              <p className="sectionTitle__text mt-5 text-dark-1">
                Discover the passion behind Kilimanjaro Explore
              </p>
            </div>

            <div className="mt-30">
              <div className="row y-gap-20">
                <div className="col-12">
                  <div className="bg-white rounded-8 p-5 shadow-1">
                    <div className="d-flex items-center justify-center mb-20">
                      <div className="size-40 rounded-full bg-accent-1 flex-center">
                        <i className="icon-compass text-16 text-white"></i>
                      </div>
                      <h3 className="text-20 fw-500 ml-20">Our Mission</h3>
                    </div>
                    <p className="text-dark-1 text-16 leading-7 text-center">
                      At Kilimanjaro Explore, we are passionate storytellers of
                      Africa's majestic peaks and untamed landscapes. Based at
                      the foot of the legendary Mount Kilimanjaro, our mission
                      is to offer unforgettable, authentic, and safe adventures
                      for travelers seeking to explore the heart of Tanzania.
                    </p>
                  </div>
                </div>

                <div className="col-12">
                  <div className="bg-white rounded-8 p-5 shadow-1">
                    <div className="d-flex items-center justify-center mb-20">
                      <div className="size-40 rounded-full bg-accent-1 flex-center">
                        <i className="icon-map text-16 text-white"></i>
                      </div>
                      <h3 className="text-20 fw-500 ml-20">Our Expertise</h3>
                    </div>
                    <p className="text-dark-1 text-16 leading-7 text-center">
                      Founded by local experts with deep roots in the region, we
                      specialize in personalized trekking tours to Mount
                      Kilimanjaro, Mount Meru, and other iconic destinations, as
                      well as immersive safaris across Tanzania's world-renowned
                      national parks. Whether you're summiting Africa's highest
                      peak or witnessing the Great Migration, we ensure your
                      journey is guided by knowledge, care, and a true love for
                      the land.
                    </p>
                  </div>
                </div>

                <div className="col-12">
                  <div className="bg-white rounded-8 p-5 shadow-1">
                    <div className="d-flex items-center justify-center mb-20">
                      <div className="size-40 rounded-full bg-accent-1 flex-center">
                        <i className="icon-heart text-16 text-white"></i>
                      </div>
                      <h3 className="text-20 fw-500 ml-20">Our Values</h3>
                    </div>
                    <p className="text-dark-1 text-16 leading-7 text-center">
                      We believe in responsible tourism that benefits local
                      communities, preserves the environment, and creates
                      meaningful cultural exchanges. With Kilimanjaro Explore,
                      you're not just a visitor—you become part of our story.
                    </p>
                  </div>
                </div>

                <div className="col-12">
                  <div className="bg-accent-1 rounded-8 p-5">
                    <div className="d-flex items-center justify-center mb-20">
                      <div className="size-40 rounded-full bg-white flex-center">
                        <i className="icon-star text-16 text-accent-1"></i>
                      </div>
                      <h3 className="text-20 fw-500 ml-20 text-white">
                        Join Our Journey
                      </h3>
                    </div>
                    <p className="text-white text-18 leading-7 font-bold text-center">
                      Join us, and discover Tanzania like never before.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
