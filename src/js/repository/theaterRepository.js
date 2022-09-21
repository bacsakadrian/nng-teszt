import { Seat } from "../models/Seat.js";
/**
 * A repositoryk színenként történő megkülönböztetése objektumonként, és tartalmazza a képen látható férőhelyeket zónákra bontva,
 * illetve 2 dimenziós tömbök segítik a sorok megkülönböztetését a sorokon belüli székektől.
 */
export const redRepository = {
    auditorium: [
        [
            new Seat(1),
            new Seat(2),
            new Seat(3),
            new Seat(4),
            new Seat(5),
            new Seat(6),
            new Seat(7),
            new Seat(8),
            new Seat(9),
            new Seat(10),
            new Seat(11),
            new Seat(12),
            new Seat(13),
            new Seat(14),
        ],
        [
            new Seat(2),
            new Seat(3),
            new Seat(4),
            new Seat(5),
            new Seat(6),
            new Seat(7),
            new Seat(8),
            new Seat(9),
            new Seat(10),
            new Seat(11),
            new Seat(12),
            new Seat(13),
            new Seat(14),
        ],
        [
            new Seat(3),
            new Seat(4),
            new Seat(5),
            new Seat(6),
            new Seat(7),
            new Seat(8),
            new Seat(9),
            new Seat(10),
            new Seat(11),
            new Seat(12),
            new Seat(13),
            new Seat(14),
        ],
        [
            new Seat(4),
            new Seat(5),
            new Seat(6),
            new Seat(7),
            new Seat(8),
            new Seat(9),
            new Seat(10),
            new Seat(11),
            new Seat(12),
            new Seat(13),
            new Seat(14),
        ]
    ],
    balconymid: [
        [
            new Seat(3),
            new Seat(4),
            new Seat(5),
            new Seat(6),
            new Seat(7),
            new Seat(8),
            new Seat(9),
            new Seat(10),
            new Seat(11),
            new Seat(12),
            new Seat(13),
            new Seat(14),
            new Seat(15),
            new Seat(16),
        ]
    ]
}

export const yellowRepository = {
    auditorium : [
        [],
        [
            new Seat(1),
            new Seat(15),
        ],
        [
            new Seat(1),
            new Seat(2),
            new Seat(15),
            new Seat(16),
        ],
        [
            new Seat(2),
            new Seat(3),
            new Seat(15),
            new Seat(16),
        ],
        [
            new Seat(4),
            new Seat(5),
            new Seat(6),
            new Seat(7),
            new Seat(8),
            new Seat(9),
            new Seat(10),
            new Seat(11),
            new Seat(12),
            new Seat(13),
            new Seat(14),
            new Seat(15),
        ],
        [
            new Seat(6),
            new Seat(7),
            new Seat(8),
            new Seat(9),
            new Seat(10),
            new Seat(11),
            new Seat(12),
            new Seat(13),
            new Seat(14),
        ]
    ],
    balconymid : [
        [
            new Seat(1),
            new Seat(2),
            new Seat(17),
            new Seat(18),
        ],
        [
            new Seat(6),
            new Seat(7),
            new Seat(8),
            new Seat(9),
            new Seat(10),
            new Seat(11),
            new Seat(12),
            new Seat(13),
            new Seat(14),
        ]
    ],
    balconyright : [
        [
            new Seat(1),
            new Seat(2),
            new Seat(3),
        ]
    ],
    balconyleft : [
        [
            new Seat(1),
            new Seat(2),
            new Seat(3),
        ]
    ]
}

export const blueRepository = {
    auditorium : [
        [],[],[],
        [
            new Seat(1),
            new Seat(17),
        ],
        [
            new Seat(1),
            new Seat(2),
            new Seat(3),
            new Seat(16),
            new Seat(17),
            new Seat(18),
        ],
        [
            new Seat(1),
            new Seat(2),
            new Seat(3),
            new Seat(4),
            new Seat(5),
            new Seat(15),
            new Seat(16),
            new Seat(17),
            new Seat(18),
            new Seat(19),
        ],
        [
            new Seat(1),
            new Seat(2),
            new Seat(3),
            new Seat(4),
            new Seat(5),
            new Seat(6),
            new Seat(7),
            new Seat(8),
            new Seat(9),
            new Seat(10),
            new Seat(11),
            new Seat(12),
            new Seat(13),
            new Seat(14),
            new Seat(15),
            new Seat(16),
            new Seat(17),
            new Seat(18),
            new Seat(19),
            new Seat(20),
        ],
        [
            new Seat(1),
            new Seat(2),
            new Seat(3),
            new Seat(4),
            new Seat(5),
            new Seat(6),
            new Seat(7),
            new Seat(8),
            new Seat(9),
            new Seat(10),
            new Seat(11),
            new Seat(12),
            new Seat(13),
            new Seat(14),
            new Seat(15),
            new Seat(16),
            new Seat(17),
            new Seat(18),
            new Seat(19),
            new Seat(20),
            new Seat(21),
        ]
    ],
    balconymid: [
        [],
        [
            new Seat(3),
            new Seat(4),
            new Seat(5),
            new Seat(15),
            new Seat(16),
            new Seat(17)
        ]
    ],
    balconyright: [
        [
            new Seat(4),
        ],
        [
            new Seat(1),
            new Seat(2),
            new Seat(3),
        ]
    ],
    balconyleft: [
        [
            new Seat(4),
        ],
        [
            new Seat(1),
            new Seat(2),
            new Seat(3),
        ]
    ],
    boxright1: [
        [
            new Seat(1),
            new Seat(2),
            new Seat(3),
        ]
    ],
    boxright2: [
        [
            new Seat(1),
            new Seat(2),
            new Seat(3),
        ]
    ],
    boxleft1: [
        [
            new Seat(1),
            new Seat(2),
            new Seat(3),
        ]
    ],
    boxleft2: [
        [
            new Seat(1),
            new Seat(2),
            new Seat(3),
        ]
    ]
}

export const greenRepository = {
    balconymid: [
        [],
        [
            new Seat(1),
            new Seat(2),
            new Seat(18),
            new Seat(19),
        ]
    ],
    balconyright: [
        [],
        [
            new Seat(4),
        ]
    ],
    balconyleft: [
        [],
        [
            new Seat(4),
        ]
    ],
    boxright1: [
        [],
        [
            new Seat(1),
            new Seat(2),
            new Seat(3),
        ]
    ],
    boxright2: [
        [],
        [
            new Seat(1),
            new Seat(2),
            new Seat(3),
        ]
    ],
    boxleft1: [
        [],
        [
            new Seat(1),
            new Seat(2),
            new Seat(3),
        ]
    ],
    boxleft2: [
        [],
        [
            new Seat(1),
            new Seat(2),
            new Seat(3),
        ]
    ]
}