import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {

  return (
    <div className="text-black bg-black">
    <section class="text-gray-600 body-font">
      <div class="max-w-5xl pt-52 pb-15 mx-auto">
        <h1 class="text-80 text-center font-4 lh-6 ld-04 font-bold text-white mb-6">
        Revolutionize Exams with AI-Enhanced Academic System
        </h1>
        <h2 class="text-2xl font-4 font-semibold lh-6 ld-04 pb-11 text-gray-700 text-center">
          Proctorly is a free to use app which maintains academic discipline
          <br />
          and prevent unethical behavior with AI
        </h2>
        <div className="ml-6 text-center">
        <Link
          to="/login"
          className="rounded-md inline-flex items-center py-3 font-semibold text-black transition duration-500 ease-in-out transform bg-transparent bg-white px-7 text-md md:mt-0 hover:text-black hover:bg-white focus:shadow-outline"
        >
          <div className="flex text-lg">
            <span className="justify-center">Student Login</span>
          </div>
        </Link>
          <a
            className="rounded-md inline-flex items-center py-3 font-semibold tracking-tighter text-white transition duration-500 ease-in-out transform bg-transparent ml-11 bg-gradient-to-r from-green-500 to-blue-800 px-14 text-md md:mt-0 focus:shadow-outline"
            href="/"
          >
            <div className="flex text-lg">
              <span className="justify-center">Instructor Login</span>
            </div>
          </a>
        </div>
      </div>
      <h2 className="pt-40 mb-1 text-2xl font-semibold tracking-tighter text-center text-gray-200 lg:text-7xl md:text-6xl">
        Secure And Safe.
      </h2>
      <br></br>
      <p className="mx-auto text-xl text-center text-gray-300 font-normal leading-relaxed fs521 lg:w-2/3">
        Here are all the features that Proctorly Provides
      </p>
      <div className="pt-12 pb-24 max-w-4xl mx-auto fsac4 md:px-1 px-3">
        <div class="ktq4">
          <h3 class="pt-3 font-semibold text-lg text-white">
            Mac Address And IP Address Monitoring
          </h3>
          <p class="pt-2 value-text text-md text-gray-200 fkrr1">
            By monitoring these addresses, our AI system can quickly
            detect any suspicious activities and stop potential
            cheaters from accessing the exam.
          </p>
        </div>
        <div class="ktq4">
          <h3 class="pt-3 font-semibold text-lg text-white">
            AI EYE Gaze Detection
          </h3>
          <p class="pt-2 value-text text-md text-gray-200 fkrr1">
            Our AI system features eye gaze detection technology that
            can analyze a student's eye movements to detect if
            they are looking away from the screen.
          </p>
        </div>
        <div class="ktq4">
          <h3 class="pt-3 font-semibold text-lg text-white">
            Fully Encrypted
          </h3>
          <p class="pt-2 value-text text-md text-gray-200 fkrr1">
            Proctorly uses the latest encryption technology to ensure
            that all data transmitted during the exam is fully
            encrypted and secure.
          </p>
        </div>
        <div class="ktq4">
          <h3 class="pt-3 font-semibold text-lg text-white">
            Fast And Responsive
          </h3>
          <p class="pt-2 value-text text-md text-gray-200 fkrr1">
            Proctorly is optimized to run smoothly on devices and
            platforms, ensuring that students can take the exam
            without any lag or delays.
          </p>
        </div>
      </div>
      <section class="relative pb-24">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div class="py-24 md:py-20">
            <h1 class="mb-5 text-6xl font-bold text-white">
              Subscribe to our newsletter
            </h1>
            <h1 class="mb-9 text-2xl font-semibold text-gray-200">
              Enter your email address and get our newsletters straight away.
            </h1>
            <input
              type="email"
              placeholder="hello@Proctorly.com"
              name="email"
              autocomplete="email"
              class="border border-gray-600 w-1/4 pr-2 pl-2 py-3 mt-2 rounded-md text-gray-800 font-semibold hover:border-gray-700 bg-black"
            />{" "}
            <a
              class="inline-flex items-center px-14 py-3 mt-2 ml-2 font-medium text-black transition duration-500 ease-in-out transform bg-transparent border rounded-lg bg-white"
              href="/"
            >
              <span class="justify-center">Subscribe</span>
            </a>
          </div>
        </div>
      </section>
    </section>
    </div>
  )
}
