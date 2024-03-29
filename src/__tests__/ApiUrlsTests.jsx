import React from 'react';
import Urls from '../ApiUrls';

describe('ApiUrls tests', () => {
    beforeEach(() => {
        global.requestAnimationFrame = (cb) => {setTimeout(cb, 0);}
    });

    it('returns the right url in dev for ADD2', () => {
        expect(Urls.ADD2Url('development')).toContain('localhost');
    });

    it('returns the right url in prod for ADD2', () => {
        expect(Urls.ADD2Url('production')).toContain('add2ent-dev');
    });

    it('returns the right url in dev for DD35', () => {
        expect(Urls.DD35Url('development')).toContain('localhost');
    });

    it('returns the right url in prod for DD35', () => {
        expect(Urls.DD35Url('production')).toContain('dd35ent');
    });
});
