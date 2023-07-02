This document spells out the required API contracts for this UI to work. It's split up by game

# ADD2

`api/ADD2Character/`

## Get All Characters

`get: /`

Response:

```json
[
	{
		"id": 1,  
		"name": "Test1",  
		"str": 0,  
		"dex": 0,  
		"con": 0,  
		"int": 0,  
		"wis": 0,  
		"chr": 0,  
		"race": "none",  
		"availableRaces": [],  
		"gender": "n",  
		"height": 0,  
		"weight": 0,  
		"age": 0,  
		"className": "none",  
		"availableClasses": [],  
		"alignment": "none",  
		"availableAlignments": [],  
		"hp": 0,  
		"paralyze": 0,  
		"rod": 0,  
		"petrification": 0,  
		"breath": 0,  
		"spell": 0,  
		"moveRate": 0,  
		"funds": 0,  
		"completionStep": 1
	},
	{
		"id": 2,
		"name": "Someone",  
		"str": 8,  
		"dex": 11,  
		"con": 10,  
		"int": 18,  
		"wis": 9,  
		"chr": 14,  
		"race": "Human",  
		"availableRaces": [],  
		"gender": "M",  
		"height": 64,  
		"weight": 115,  
		"age": 20,  
		"className": "Mage",  
		"availableClasses": [],  
		"alignment": "Neutral Good",  
		"availableAlignments": [],  
		"hp": 4,  
		"paralyze": 14,  
		"rod": 11,  
		"petrification": 13,  
		"breath": 15,  
		"spell": 12,  
		"moveRate": 12,  
		"funds": 50,  
		"completionStep": 6  
	 }
	 // etc...
 ]
 ```

## Get a Character by Id

`get: /1`

Response:

```json
{
  "id": 1,
  "name": "Test1",
  "str": 0,
  "dex": 0,
  "con": 0,
  "int": 0,
  "wis": 0,
  "chr": 0,
  "race": "none",
  "availableRaces": [],
  "gender": "n",
  "height": 0,
  "weight": 0,
  "age": 0,
  "className": "none",
  "availableClasses": [],
  "alignment": "none",
  "availableAlignments": [],
  "hp": 0,
  "paralyze": 0,
  "rod": 0,
  "petrification": 0,
  "breath": 0,
  "spell": 0,
  "moveRate": 0,
  "funds": 0,
  "completionStep": 1
}
```

## Create a New Character

`post: /`

Request Body:

```json
{"id":7,"name":"asdfasdfaaa","completionStep":1,"str":0,"dex":0,"con":0,"int":0,"wis":0,"chr":0,"race":"none","gender":"n","height":0,"weight":0,"age":0,"className":"none","alignment":"none","paralyze":0,"rod":0,"petrification":0,"breath":0,"spell":0,"hp":0,"moveRate":0,"funds":0}
```

## Update a Character

`put: /5`

Request Body:

```json
{"id":5,"name":"asdfasdf","str":8,"dex":8,"con":14,"int":11,"wis":4,"chr":8,"race":"none","availableRaces":["Dwarf","Elf","Gnome","Half-Elf","Halfling","Human"],"gender":"n","height":0,"weight":0,"age":0,"className":"none","availableClasses":[],"alignment":"none","availableAlignments":[],"hp":0,"paralyze":0,"rod":0,"petrification":0,"breath":0,"spell":0,"moveRate":0,"funds":0,"completionStep":2}
```

## Delete a Character

`delete: /7`

## Roll Stats

There are 6 different rules that can be used to determine initial stats

`get: /rollstats/rollonce`

Response:

```json
[
  [ 3, 2, 5 ],
  [ 1, 5, 6 ],
  [ 4, 3, 6 ],
  [ 3, 3, 5 ],
  [ 1, 3, 1 ],
  [ 1, 4, 2 ]
]
```

`get: /rollstats/rolltwice`

Response:

```json
[
  [ 3, 3, 6 ],
  [ 5, 6, 5 ],
  [ 1, 3, 1 ],
  [ 2, 2, 6 ],
  [ 5, 4, 2 ],
  [ 5, 6, 6 ],
  [ 5, 1, 4 ],
  [ 3, 3, 3 ],
  [ 6, 2, 2 ],
  [ 2, 6, 3 ],
  [ 5, 5, 5 ],
  [ 2, 2, 2 ]
]
```

`get: /rollstats/assignment`

Response:

```json
[
  [ 4, 6, 4 ],
  [ 2, 2, 4 ],
  [ 6, 2, 4 ],
  [ 3, 5, 1 ],
  [ 5, 3, 5 ],
  [ 4, 4, 4 ]
]
```

`get: /rollstats/assignmentdouble`

Response:

```json
[
  [ 5, 5, 6 ],
  [ 5, 5, 1 ],
  [ 1, 2, 5 ],
  [ 3, 2, 6 ],
  [ 2, 5, 1 ],
  [ 4, 6, 5 ],
  [ 1, 4, 6 ],
  [ 3, 5, 5 ],
  [ 4, 4, 5 ],
  [ 3, 5, 2 ],
  [ 6, 6, 3 ],
  [ 5, 2, 3 ]
]
```

`get: /rollstats/rollfour`

Response:

```json
[
  [ 3, 6, 3, 4 ],
  [ 2, 2, 6, 3 ],
  [ 5, 2, 4, 4 ],
  [ 1, 1, 1, 2 ],
  [ 5, 4, 3, 6 ],
  [ 5, 1, 2, 4 ]
]
```

`get: /rollstats/addsevendice`

Response:

```json
[ [ 3 ], [ 3 ], [ 6 ], [ 2 ], [ 5 ], [ 3 ], [ 6 ] ]
```

## Get Available Races

Once we know the attributes, we can use them to gather the races available for selection

The min and max stats for the races are as follows:

| Race     | Str    | Dex    | Con     | Int    | Wis    | Chr    |
|----------|--------|--------|---------|--------|--------|--------|
| Dwarf    | 8 - 18 | 3 - 17 | 11 - 18 | 3 - 18 | 3 - 18 | 3 - 17 |
| Elf      | 3 - 18 | 6 - 18 | 7 - 18  | 8 - 18 | 3 - 18 | 8 - 18 |
| Gnome    | 6 - 18 | 3 - 18 | 8 - 18  | 6 - 18 | 3 - 18 | 3 - 18 |
| Half-Elf | 3 - 18 | 6 - 18 | 6 - 18  | 4 - 18 | 3 - 18 | 3 - 18 |
| Halfling | 7 - 18 | 7 - 18 | 10 - 18 | 6 - 18 | 3 - 17 | 3 - 18 |
| Human    | 3 - 18 | 3 - 18 | 3 - 18  | 3 - 18 | 3 - 18 | 3 - 18 |

`get: /races/{str}/{dex}/{con}/{int}/{wis}/{chr}`

Example:

`get: /races/9/9/9/9/9/9`

Response:

```json
[
  "Elf",
  "Gnome",
  "Half-Elf",
  "Human"
]
// Note that Dwarf and Halfling are excluded due to Con minimums not being met
```

## Get Stat Adjustments

Most races in this game have associated stat adjustments when you select them:

| Race     | Adjustments      |
|----------|------------------|
| Dwarf    | con + 1, chr - 1 |
| Elf      | dex + 1, con - 1 |
| Gnome    | int + 1, wis - 1 |
| Half-Elf | N/A              |
| Halfling | dex + 1, str - 1 |
| Human    | N/A              |

`get: /statadjust/Elf`

Response:

```json
{
  "dex": 1,
  "con": -1
}
```

## Get Classes

Once race is known, the available classes can be fetched

Race and stat restrictions:

| Class   | Min Str | Min Dex | Min Con | Min Int | Min Wis | Min Chr | Race(s) Allowed      |
|---------|---------|---------|---------|---------|---------|---------|----------------------|
| Fighter | 9       | 3       | 3       | 3       | 3       | 3       | All                  |
| Paladin | 12      | 3       | 9       | 3       | 13      | 17      | Human                |
| Ranger  | 13      | 13      | 14      | 3       | 14      | 3       | Elf, Half-Elf, Human |
| Mage    | 3       | 3       | 3       | 9       | 3       | 3       | Elf, Half-Elf, Human |
| Cleric  | 3       | 3       | 3       | 3       | 9       | 3       | All                  |
| Druid   | 3       | 3       | 3       | 3       | 12      | 15      | Half-Elf, Human      |
| Thief   | 3       | 9       | 3       | 3       | 3       | 3       | All                  |
| Bard    | 3       | 12      | 3       | 13      | 3       | 15      | Half-Elf, Human      |

Multi-Class Combos by Race:

| Race     | Allowed Multi-Class Combos                                                                                                                                                                |
|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Dwarf    | Fighter/Cleric, Fighter/Thief                                                                                                                                                             |
| Elf      | Fighter/Mage, Fighter/Thief, Mage/Thief, Fighter/Mage/Thief                                                                                                                               |
| Gnome    | Fighter/Cleric, Fighter/Thief, Cleric/Thief                                                                                                                                               |
| Half-Elf | Fighter/Cleric, Fighter/Thief, Fighter/Druid, Fighter/Mage, Cleric/Ranger, Druid/Ranger, Cleric/Mage, Druid/Mage, Thief/Mage, Fighter/Mage/Cleric, Fighter/Mage/Druid, Fighter/Mage/Thief |
| Halfling | Fighter/Thief                                                                                                                                                                             |
| Human    | None                                                                                                                                                                                      |

`get: /classes/{race}/{str}/{dex}/{con}/{int}/{wis}/{chr}`

Example:

`get: /classes/Elf/9/9/9/9/9/9`

Response:

```json
[
  "Fighter",
  "Mage",
  "Cleric",
  "Thief",
  "Fighter/Mage",
  "Fighter/Thief",
  "Mage/Thief",
  "Fighter/Mage/Thief"
]
```

## Get Alignments

Once class is known, the available alignments can be queried

| Class   | Allowed Alignments                                                        |
|---------|---------------------------------------------------------------------------|
| Paladin | Lawful Good                                                               |
| Druid   | True Neutral                                                              |
| Ranger  | Lawful Good, Neutral Good, Chaotic Good                                   |
| Bard    | Lawful Neutral, Neutral Good, True Neutral, Neutral Evil, Chaotic Neutral |
| Fighter | All                                                                       |
| Mage    | All                                                                       |
| Cleric  | All                                                                       |
| Thief   | All                                                                       |

`get; /alignment/Ranger`

Response:

```json
[
  "Lawful Good",
  "Neutral Good",
  "Chaotic Good"
]
```

## Get Height/Weight/Age

Once race and gender have been chosen, the starting height, weight, and age can be determined as follows:

| Race     | Gender | Base Height | Base Weight | Base Age | Height Mod | Weight Mod | Age Mod |
|----------|--------|-------------|-------------|----------|------------|------------|---------|
| Dwarf    | Male   | 43          | 130         | 40       | 1d10       | 4d10       | 5d6     |
|          | Female | 41          | 105         | 40       | 1d10       | 4d10       | 5d6     |
| Elf      | Male   | 55          | 90          | 100      | 1d10       | 3d10       | 5d6     |
|          | Female | 50          | 70          | 100      | 1d10       | 3d10       | 5d6     |
| Gnome    | Male   | 38          | 72          | 60       | 1d6        | 5d4        | 3d12    |
|          | Female | 36          | 68          | 60       | 1d6        | 5d4        | 3d12    |
| Half-Elf | Male   | 60          | 110         | 15       | 2d6        | 3d12       | 1d6     |
|          | Female | 58          | 85          | 15       | 2d6        | 3d12       | 1d6     |
| Halfling | Male   | 32          | 52          | 20       | 2d8        | 5d4        | 3d4     |
|          | Female | 30          | 48          | 20       | 2d8        | 5d4        | 3d4     |
| Human    | Male   | 60          | 140         | 15       | 2d10       | 6d10       | 1d4     |
|          | Female | 59          | 100         | 15       | 2d10       | 6d10       | 1d4     |

`get: /hwa/Elf/m`

Response:

```json
[ 64, 99, 121 ]
```

This response is used as follows:

`[ height, weight, age ]`

## Get Initial HP and GP

Need to roll for starting HP and funds

`get: /hpgp/Fighter`

Response:

```json
[ 3, 100 ]
```

The response is used as follows:

`[ Initial HP, Initial GP ]`

## Get Final Attributes

As the final stage, we use the class(es) and race to determine the movement rate and initial saving throw values

`get: /final/{race}/{className}/{classTwo}/{classThree}`

*note: classTwo and classThree are optional*

Example:

`get: /final/Half-Elf/Fighter/Cleric`

Response:

```json
[ 12, 14, 16, 15, 17, 17 ]
```

The values are used as follows:

`[ moveRate, paralyze, rod, petrification, breath, spell ]`

# DD35

`api/DD35Character/`

## Get All Characters

`get: /`

Response:

```json
[
  {
    "id": 1,
    "name": "asd"
  },
  {
    "id": 2,
    "name": "asdfasdf"
  }
]
```

## Create a Character

`post: /`

Payload:

```json
{"id":3,"name":"test"}
```

## Delete a Character

`delete: /1`
