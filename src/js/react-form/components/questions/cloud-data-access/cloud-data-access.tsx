import React from 'react';
import { TextField } from '../../shared/text-field/text-field';

export const CloudDataAccess = () => {
    return (
        <div className="conetnt-box">
            <div className="text-wrap">
                <p className="text">
                    In order for us to manage your calendar, do you agree to
                    provide access to your Google and/and Microsoft accounts? If
                    you do not agree, the following basic functions will not be
                    available:
                </p>
                <p className="text sm">
                    <span>Appointment Scheduling and Calendar Management:</span>{' '}
                    Managing the user's calendar, scheduling appointments,
                    meetings, and reminders, and sending notifications for
                    upcoming events.
                </p>
            </div>
            <form className="cloud-data-access">
                <TextField
                    label="Link 1"
                    placeholder="http:/example.com"
                    type="url"
                />
                <div className="btn-wrap">
                    <button className="btn-add click-song">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                        >
                            <g clip-path="url(#clip0_1012_6216)">
                                <path
                                    d="M9.66758 1.18139L8.33424 1.18139L8.33438 8.33347L1.18229 8.33333V9.66667L8.33424 9.66667L8.33424 16.8186L9.66758 16.8186L9.66757 9.66667L16.8195 9.66667V8.33333L9.66757 8.33333L9.66758 1.18139Z"
                                    fill="#5CFF4F"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_1012_6216">
                                    <rect
                                        width="12"
                                        height="12"
                                        fill="white"
                                        transform="translate(0.515625 9) rotate(-45)"
                                    />
                                </clipPath>
                            </defs>
                        </svg>
                        Add one more link
                    </button>
                </div>
            </form>
        </div>
    );
};
