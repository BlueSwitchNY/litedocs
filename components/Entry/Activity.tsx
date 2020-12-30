import { NextPage } from "next"
import Head from "next/head"
import React, { useRef, useState, useEffect, useContext } from "react"

interface Props {
  activity?: any
}

const Activity: NextPage<Props> = ({ activity }) => {
  return (
    <section aria-labelledby="activity-title" className="mt-8 xl:mt-10">
      <div>
        <div className="divide-y divide-gray-200">
          <div className="pb-4">
            <h2
              id="activity-title"
              className="text-lg font-medium text-gray-900"
            >
              Activity
            </h2>
          </div>
          <div className="hidden pt-6">
            {/* Activity feed*/}
            <div className="flow-root">
              <ul className="-mb-8">
                <li>
                  <div className="relative pb-8">
                    <span
                      className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                    <div className="relative flex items-start space-x-3">
                      <div className="relative">
                        <img
                          className="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white"
                          src="https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                          alt=""
                        />
                        <span className="absolute -bottom-0.5 -right-1 bg-white rounded-tl px-0.5 py-px">
                          {/* Heroicon name: chat-alt */}
                          <svg
                            className="h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <div className="text-sm">
                            <a href="#" className="font-medium text-gray-900">
                              Eduardo Benz
                            </a>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">
                            Commented 6d ago
                          </p>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Tincidunt nunc ipsum tempor purus vitae id.
                            Morbi in vestibulum nec varius. Et diam cursus quis
                            sed purus nam.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="relative pb-8">
                    <span
                      className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                    <div className="relative flex items-start space-x-3">
                      <div>
                        <div className="relative px-1">
                          <div className="h-8 w-8 bg-gray-100 rounded-full ring-8 ring-white flex items-center justify-center">
                            {/* Heroicon name: user-circle */}
                            <svg
                              className="h-5 w-5 text-gray-500"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="min-w-0 flex-1 py-1.5">
                        <div className="text-sm text-gray-500">
                          <a href="#" className="font-medium text-gray-900">
                            Hilary Mahy{" "}
                          </a>
                          assigned{" "}
                          <a href="#" className="font-medium text-gray-900">
                            Kristin Watson
                          </a>{" "}
                          <span className="whitespace-nowrap">2d ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="relative pb-8">
                    <span
                      className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                    <div className="relative flex items-start space-x-3">
                      <div>
                        <div className="relative px-1">
                          <div className="h-8 w-8 bg-gray-100 rounded-full ring-8 ring-white flex items-center justify-center">
                            {/* Heroicon name: tag */}
                            <svg
                              className="h-5 w-5 text-gray-500"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="min-w-0 flex-1 py-0">
                        <div className="text-sm leading-8 text-gray-500">
                          <span className="mr-0.5">
                            <a href="#" className="font-medium text-gray-900">
                              Hilary Mahy{" "}
                            </a>
                            added tags{" "}
                          </span>
                          <span className="mr-0.5">
                            <a
                              href="#"
                              className="mr-1 relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 text-sm"
                            >
                              <span className="absolute flex-shrink-0 flex items-center justify-center">
                                <span
                                  className="h-1.5 w-1.5 rounded-full bg-red-500"
                                  aria-hidden="true"
                                />
                              </span>
                              <span className="ml-3.5 font-medium text-gray-900">
                                Bug
                              </span>
                            </a>
                            <a
                              href="#"
                              className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 text-sm"
                            >
                              <span className="absolute flex-shrink-0 flex items-center justify-center">
                                <span
                                  className="h-1.5 w-1.5 rounded-full bg-indigo-500"
                                  aria-hidden="true"
                                />
                              </span>
                              <span className="ml-3.5 font-medium text-gray-900">
                                Accessibility
                              </span>
                            </a>
                          </span>{" "}
                          <span className="whitespace-nowrap">6h ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="relative pb-8">
                    <div className="relative flex items-start space-x-3">
                      <div className="relative">
                        <img
                          className="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white"
                          src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                          alt=""
                        />
                        <span className="absolute -bottom-0.5 -right-1 bg-white rounded-tl px-0.5 py-px">
                          {/* Heroicon name: chat-alt */}
                          <svg
                            className="h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <div className="text-sm">
                            <a href="#" className="font-medium text-gray-900">
                              Jason Meyers
                            </a>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">
                            Commented 2h ago
                          </p>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Tincidunt nunc ipsum tempor purus vitae id.
                            Morbi in vestibulum nec varius. Et diam cursus quis
                            sed purus nam. Scelerisque amet elit non sit ut
                            tincidunt condimentum. Nisl ultrices eu venenatis
                            diam.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <div className="flex space-x-3">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      className="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white"
                      src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                      alt=""
                    />
                    <span className="absolute -bottom-0.5 -right-1 bg-white rounded-tl px-0.5 py-px">
                      {/* Heroicon name: chat-alt */}
                      <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <form action="#">
                    <div>
                      <label htmlFor="comment" className="sr-only">
                        Comment
                      </label>
                      <textarea
                        id="comment"
                        name="comment"
                        rows={3}
                        className="shadow-sm block w-full focus:ring-gray-900 focus:border-gray-900 sm:text-sm border-gray-300 rounded-md"
                        placeholder="Leave a comment"
                        defaultValue={""}
                      />
                    </div>
                    <div className="mt-6 flex items-center justify-end space-x-4">
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                      >
                        {/* Heroicon name: check-circle */}
                        <svg
                          className="-ml-1 mr-2 h-5 w-5 text-green-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Close issue</span>
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                      >
                        Comment
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Activity
