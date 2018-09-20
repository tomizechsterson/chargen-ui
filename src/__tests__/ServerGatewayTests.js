import sinon from 'sinon';
import ServerGateway from '../ServerGateway';

describe('ServerGateway tests', () => {
    let xhr, requests, gateway, error;

    beforeEach(() => {
        xhr = sinon.useFakeXMLHttpRequest();
        requests = [];
        xhr.onCreate = function(xhr) {
            requests.push(xhr);
        }.bind(this);

        gateway = new ServerGateway();
        error = jest.fn();
    });
    afterEach(() => {
        xhr.restore();
    });

    it('returns data from server with get call', () => {
        const dataJson = JSON.stringify(getTestCharData());

        gateway.getChars(function(response) {
            expect(response).toHaveLength(5);
        });
        requests[0].respond(200, {'Content-Type': 'application/json'}, dataJson);
    });

    it('calls onError callback if get fails', () => {
        gateway.getChars(null, error);
        requests[0].respond(500, '', 'test get error');

        assertErrorCall(error, 'test get error');
    });

    it('calls service with expected id for deletion', () => {
        gateway.deleteChar(9, function() {
            expect(requests[0].method).toEqual('delete');
            expect(requests[0].url).toEqual(expect.stringMatching(/\/add2character\/9$/));
        });
        requests[0].respond(200);
    });

    it('calls onError if delete fails', () => {
        gateway.deleteChar(1, null, error);
        requests[0].respond(500, '', 'test delete error');

        assertErrorCall(error, 'test delete error');
    });

    it('calls update on service with expected id and request body', () => {
        const testChar = {id: 1, str: 3, dex: 4, con: 5, int: 6, wis: 7, chr: 8};
        gateway.updateChar(testChar, function() {
            expect(requests[0].method).toEqual('put');
            expect(requests[0].url).toEqual(expect.stringMatching(/\/add2character\/1$/));
            expect(requests[0].requestBody).toContain('"str":3');
            expect(requests[0].requestBody).toContain('"dex":4');
            expect(requests[0].requestBody).toContain('"con":5');
            expect(requests[0].requestBody).toContain('"int":6');
            expect(requests[0].requestBody).toContain('"wis":7');
            expect(requests[0].requestBody).toContain('"chr":8');
        });
        requests[0].respond(200);
    });

    it('calls onError if update fails', () => {
        gateway.deleteChar(1, null, error);
        requests[0].respond(500, '', 'test update error');

        assertErrorCall(error, 'test update error');
    });

    it('calls new on service with expected request body', () => {
        const testChar = {name: 'testName'};
        gateway.createChar(testChar, function() {
            expect(requests[0].method).toEqual('post');
            expect(requests[0].url).toEqual(expect.stringMatching(/\/new$/));
            expect(requests[0].requestBody).toContain('"name":"testName"');
        });
        requests[0].respond(200);
    });

    it('calls onError if creating character fails', () => {
        gateway.createChar(null, null, error);
        requests[0].respond(500, '', 'test create error');

        assertErrorCall(error, 'test create error');
    });

    it('returns expected rolls with rollOnce rule', () => {
        const rollsJson = JSON.stringify(get6Rolls());

        gateway.rollOnce(function(response) {
            assertRollData(response, 6, get6Rolls());
        });
        requests[0].respond(200, {'Content-Type': 'application/json'}, rollsJson);
    });

    it('calls onError if rollOnce server call fails', () => {
        gateway.rollOnce(null, error);
        requests[0].respond(500, '', 'test rollOnce error');

        assertErrorCall(error, 'test rollOnce error');
    });

    it('returns expected rolls with rollTwice rule', () => {
        const rollsJson = JSON.stringify(get12Rolls());

        gateway.rollTwice(function(response) {
            assertRollData(response, 12, get12Rolls());
        });
        requests[0].respond(200, {'Content-Type': 'application/json'}, rollsJson);
    });

    it('calls onError if rollTwice server call fails', () => {
        gateway.rollTwice(null, error);
        requests[0].respond(500, '', 'test rollTwice error');

        assertErrorCall(error, 'test rollTwice error');
    });

    it('returns expected rolls with assignment rule', () => {
        const rollsJson = JSON.stringify(get6Rolls());

        gateway.assignment('assignment', function(response) {
            assertRollData(response, 6, get6Rolls());
        });
        requests[0].respond(200, {'Content-Type': 'application/json'}, rollsJson);
    });

    it('returns expected rolls with assignmentDouble rule', () => {
        const rollsJson = JSON.stringify(get12Rolls());

        gateway.assignment('assignmentDouble', function(response) {
            assertRollData(response, 12, get12Rolls());
        });
        requests[0].respond(200, {'Content-Type': 'application/json'}, rollsJson);
    });

    it('calls onError if the assignment server call fails', () => {
        gateway.assignment('test', null, error);
        requests[0].respond(500, '', 'test assignment error');

        assertErrorCall(error, 'test assignment error');
    });

    it('returns expected results with rollFour rule', () => {
        const rollsJson = JSON.stringify(get6RollsWith4Dice());

        gateway.rollFour(function(response) {
            assertRollData(response, 6, get6RollsWith4Dice());
        });
        requests[0].respond(200, {'Content-Type': 'application/json'}, rollsJson);
    });

    it('calls onError if rollFour server call fails', () => {
        gateway.rollFour(null, error);
        requests[0].respond(500, '', 'test rollFour error');

        assertErrorCall(error, 'test rollFour error');
    });

    it('returns expected results with Add7 rule', () => {
        const rollsJson = JSON.stringify(get7Rolls());

        gateway.add7Dice(function(response) {
            assertRollData(response, 7, get7Rolls());
        });
        requests[0].respond(200, {'Content-Type': 'application/json'}, rollsJson);
    });

    it('calls onError if Add7 server call fails', () => {
        gateway.add7Dice(null, error);
        requests[0].respond(500, '', 'test add7Dice error');

        assertErrorCall(error, 'test add7Dice error');
    });

    it('returns expected results with getRaces', () => {
        const racesJson = JSON.stringify(['race1', 'race2']);

        gateway.getRaces({}, function(response) {
            expect(response).toContain('race1');
            expect(response).toContain('race2');
        });
        requests[0].respond(200, {'Content-Type': 'application/json'}, racesJson);
    });

    it('calls onError if getRaces call fails', () => {
        gateway.getRaces({}, null, error);
        requests[0].respond(500, '', 'test getRaces error');

        assertErrorCall(error, 'test getRaces error');
    });

    it('returns expected results when getStatAdjustments', () => {
        const adjustments = JSON.stringify({'int': 1, 'wis': -1});

        gateway.getAdjustments('test', function(response) {
            expect(response.int).toBe(1);
            expect(response.wis).toBe(-1);
        });
        requests[0].respond(200, {'Content-Type': 'application/json'}, adjustments);
    });

    it('calls onError if getStatAdjustments fails', () => {
        gateway.getAdjustments('', null, error);
        requests[0].respond(500, '', 'test adjustments error');

        assertErrorCall(error, 'test adjustments error');
    });

    it('returns expected results with getClasses', () => {
        const classesJson = JSON.stringify(['class1', 'class2']);

        gateway.getClasses({}, function(response) {
            expect(response).toContain('class1');
            expect(response).toContain('class2');
        });
        requests[0].respond(200, {'Content-Type': 'application/json'}, classesJson);
    });

    it('calls onError if getClasses fails', () => {
        gateway.getClasses({}, null, error);
        requests[0].respond(500, '', 'test getClasses error');

        assertErrorCall(error, 'test getClasses error');
    });

    it('returns expected results with getAlignments', () => {
        const alignmentsJson = JSON.stringify(['test1', 'test2']);

        gateway.getAlignments('', function(response) {
            expect(response).toContain('test1');
            expect(response).toContain('test2');
        });
        requests[0].respond(200, {'Content-Type': 'application/json'}, alignmentsJson);
    });

    it('calls onError if getAlignments fails', () => {
        gateway.getAlignments('', null, error);
        requests[0].respond(500, '', 'test alignments error');

        assertErrorCall(error, 'test alignments error');
    });

    it('returns expected results when getting height/weight/age', () => {
        const hwaJson = JSON.stringify([65, 110, 19]);

        gateway.getHWA('', '', function(response) {
            expect(response).toContain(65);
            expect(response).toContain(110);
            expect(response).toContain(19);
        });
        requests[0].respond(200, {'Content-Type': 'application/json'}, hwaJson);
    });

    it('calls onError if getting height/weight/age fails', () => {
        gateway.getHWA('', '', null, error);
        requests[0].respond(500, '', 'test hwa error');

        assertErrorCall(error, 'test hwa error');
    });

    it('returns expected results when getting hp/initial funds', () => {
        const hpgpJson = JSON.stringify([7, 90]);

        gateway.getHPGP('', function(response) {
            expect(response).toContain(7);
            expect(response).toContain(90);
        });
        requests[0].respond(200, {'Content-Type':'application/json'}, hpgpJson);
    });

    it('calls onError if getting hp/initial funds fails', () => {
        gateway.getHPGP('', null, error);
        requests[0].respond(500, '', 'test hpgp error');

        assertErrorCall(error, 'test hpgp error');
    });

    it('returns expected results when getting move rate/saving throws', () => {
        const resultsJson = JSON.stringify([9, 20, 19, 18, 17, 16]);

        gateway.getFinalAttributes('', '', function(response) {
            expect(response).toContain(9);
            expect(response).toContain(20);
            expect(response).toContain(19);
            expect(response).toContain(18);
            expect(response).toContain(17);
            expect(response).toContain(16);
        });
        requests[0].respond(200, {'Content-Type': 'application/json'}, resultsJson);
    });

    it('calls onError if getting final attributes fails', () => {
        gateway.getFinalAttributes('', '', null, error);
        requests[0].respond(500, '', 'test final attributes error');

        assertErrorCall(error, 'test final attributes error');
    });

    const assertRollData = (response, length, data) => {
        expect(response).toHaveLength(length);
        expect(response).toEqual(data);
    };

    const assertErrorCall = (errorFunc, errorMsg) => {
        expect(errorFunc).toHaveBeenCalledTimes(1);
        expect(errorFunc).toHaveBeenCalledWith(errorMsg);
    };

    const getTestCharData = () => {
        return [
            {
                id: 1,
                name: 'Big McLargeHuge',
                completionStep: 2,
                str: 18,
                dex: 14,
                con: 9,
                int: 16,
                wis: 11,
                chr: 12,
                race: 'Elf',
                gender: 'M',
                height: 60,
                weight: 110,
                age: 110,
                className: 'Fighter',
                alignment: 'Lawful Good',
                paralyze: 14,
                rod: 16,
                petrification: 15,
                breath: 17,
                spell: 17,
                hp: 9,
                moveRate: 12,
                funds: 170
            },
            {
                id: 2,
                name: 'Gristle McThornbody',
                completionStep: 1,
                str: 0,
                dex: 0,
                con: 0,
                int: 0,
                wis: 0,
                chr: 0,
                race: 'none',
                gender: 'n',
                height: 0,
                weight: 0,
                age: 0,
                className: 'none',
                alignment: 'none',
                paralyze: 0,
                rod: 0,
                petrification: 0,
                breath: 0,
                spell: 0,
                hp: 0,
                moveRate: 0,
                funds: 0
            },
            {
                id: 3,
                name: 'Crunch Bonemeal',
                completionStep: 1,
                str: 0,
                dex: 0,
                con: 0,
                int: 0,
                wis: 0,
                chr: 0,
                race: 'none',
                gender: 'n',
                height: 0,
                weight: 0,
                age: 0,
                className: 'none',
                alignment: 'none',
                paralyze: 0,
                rod: 0,
                petrification: 0,
                breath: 0,
                spell: 0,
                hp: 0,
                moveRate: 0,
                funds: 0
            },
            {
                id: 4,
                name: 'Rip Steakface',
                completionStep: 1,
                str: 0,
                dex: 0,
                con: 0,
                int: 0,
                wis: 0,
                chr: 0,
                race: 'none',
                gender: 'n',
                height: 0,
                weight: 0,
                age: 0,
                className: 'none',
                alignment: 'none',
                paralyze: 0,
                rod: 0,
                petrification: 0,
                breath: 0,
                spell: 0,
                hp: 0,
                moveRate: 0,
                funds: 0
            },
            {
                id: 5,
                name: 'Swift McRunfast',
                completionStep: 2,
                str: 12,
                dex: 12,
                con: 10,
                int: 18,
                wis: 7,
                chr: 15,
                race: 'Human',
                gender: 'F',
                height: 65,
                weight: 110,
                age: 18,
                className: 'Mage',
                alignment: 'Neutral Good',
                paralyze: 14,
                rod: 11,
                petrification: 13,
                breath: 15,
                spell: 12,
                hp: 4,
                moveRate: 12,
                funds: 50
            }
        ];
    };

    const get6Rolls = () => {
        return [[1, 1, 1], [1, 1, 2], [1, 2, 2], [2, 2, 2], [2, 2, 3], [2, 3, 3]];
    };

    const get12Rolls = () => {
        return [[1, 1, 1], [1, 1, 2], [1, 2, 2], [2, 2, 2], [2, 2, 3], [2, 3, 3],
            [3, 3, 3], [3, 3, 4], [3, 3, 5], [3, 3, 6], [3, 4, 3], [3, 4, 4]];
    };

    const get6RollsWith4Dice = () => {
        return [[1, 1, 1, 1], [1, 1, 1, 2], [1, 1, 2, 2], [1, 2, 2, 2], [1, 2, 2, 3], [1, 2, 3, 3]];
    };

    const get7Rolls = () => {
        return [[1], [2], [3], [4], [5], [6], [1]];
    };
});