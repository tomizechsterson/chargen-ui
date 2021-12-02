import React from 'react';
import Urls from '../ApiUrls';

describe('ApiUrls tests', () => {
    beforeEach(() => {
        global.requestAnimationFrame = (cb) => {setTimeout(cb, 0);}
    });

    it('returns the right url in dev for ADD2', () => {
        process.env.NODE_ENV = 'development';
        expect(Urls.ADD2Url()).toContain('localhost');
    });

    it('returns the right url in prod for ADD2', () => {
        process.env.NODE_ENV = 'production';
        expect(Urls.ADD2Url()).toContain('add2ent-dev');
    });

    it('returns the right url in dev for DD35', () => {
        process.env.NODE_ENV = 'development';
        expect(Urls.DD35Url()).toContain('localhost');
    });

    it('returns the right url in prod for DD35', () => {
        process.env.NODE_ENV = 'production';
        expect(Urls.DD35Url()).toContain('dd35ent');
    });
});
