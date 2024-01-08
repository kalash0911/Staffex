import React from 'react';
import { TextField } from '../../shared/text-field/text-field';

export const DatabaseAccess = () => {
    return (
        <div className="conetnt-box">
            <div className="text-wrap">
                <p className="text">
                    If you want us to help you work with existing files, please
                    provide access to them. Access is required for the following
                    functions to function correctly:
                </p>
                <p className="text sm">
                    <span>Data Entry and Management:</span> Entering data into
                    databases or spreadsheets, updating records, and maintaining
                    databases with current information.
                </p>
                <p className="text sm">
                    <span>File Organisation:</span> Organising digital files,
                    managing cloud storage, and ensuring easy retrieval of
                    documents and information.
                </p>
            </div>
            <form className="database-access">
                <TextField
                    label="Host"
                    placeholder="5.161.178.89"
                    type="text"
                />
                <TextField label="Port" placeholder="33060" type="text" />
                <TextField
                    label="Database"
                    placeholder="Enter Database"
                    type="text"
                />
                <TextField
                    label="User"
                    placeholder="Bublik"
                    type="text"
                    className="half"
                />
                <TextField label="Password" type="text" className="half" />
                <TextField
                    label="URL"
                    placeholder="Enter connection string"
                    type="url"
                    className="max"
                />
            </form>
        </div>
    );
};
