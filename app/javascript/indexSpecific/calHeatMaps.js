const commUsageData = [
	{ date: "2023-01-01", value: 45316 },
	{ date: "2023-01-02", value: 42276 },
	{ date: "2023-01-03", value: 44016 },
	{ date: "2023-01-04", value: 42745 },
	{ date: "2023-01-05", value: 45299 },
	{ date: "2023-01-06", value: 37181 },
	{ date: "2023-01-07", value: 39047 },
	{ date: "2023-01-08", value: 35073 },
	{ date: "2023-01-09", value: 37874 },
	{ date: "2023-01-10", value: 38197 },
	{ date: "2023-01-11", value: 44237 },
	{ date: "2023-01-12", value: 38260 },
	{ date: "2023-01-13", value: 44346 },
	{ date: "2023-01-14", value: 35612 },
	{ date: "2023-01-15", value: 47748 },
	{ date: "2023-01-16", value: 49801 },
	{ date: "2023-01-17", value: 47143 },
	{ date: "2023-01-18", value: 45573 },
	{ date: "2023-01-19", value: 37760 },
	{ date: "2023-01-20", value: 39132 },
	{ date: "2023-01-21", value: 43894 },
	{ date: "2023-01-22", value: 49455 },
	{ date: "2023-01-23", value: 46136 },
	{ date: "2023-01-24", value: 37492 },
	{ date: "2023-01-25", value: 48341 },
	{ date: "2023-01-26", value: 49294 },
	{ date: "2023-01-27", value: 40077 },
	{ date: "2023-01-28", value: 41989 },
	{ date: "2023-01-29", value: 36361 },
	{ date: "2023-01-30", value: 44620 },
	{ date: "2023-01-31", value: 42393 },
	{ date: "2023-02-01", value: 44773 },
	{ date: "2023-02-02", value: 44057 },
	{ date: "2023-02-03", value: 35587 },
	{ date: "2023-02-04", value: 36838 },
	{ date: "2023-02-05", value: 49282 },
	{ date: "2023-02-06", value: 39897 },
	{ date: "2023-02-07", value: 38265 },
	{ date: "2023-02-08", value: 37754 },
	{ date: "2023-02-09", value: 43783 },
	{ date: "2023-02-10", value: 43918 },
	{ date: "2023-02-11", value: 36247 },
	{ date: "2023-02-12", value: 49441 },
	{ date: "2023-02-13", value: 43749 },
	{ date: "2023-02-14", value: 36637 },
	{ date: "2023-02-15", value: 45985 },
	{ date: "2023-02-16", value: 49949 },
	{ date: "2023-02-17", value: 46946 },
	{ date: "2023-02-18", value: 45991 },
	{ date: "2023-02-19", value: 35942 },
	{ date: "2023-02-20", value: 41853 },
	{ date: "2023-02-21", value: 41260 },
	{ date: "2023-02-22", value: 37740 },
	{ date: "2023-02-23", value: 38936 },
	{ date: "2023-02-24", value: 42851 },
	{ date: "2023-02-25", value: 49106 },
	{ date: "2023-02-26", value: 44909 },
	{ date: "2023-02-27", value: 41526 },
	{ date: "2023-02-28", value: 49166 },
	{ date: "2023-03-01", value: 46019 },
	{ date: "2023-03-02", value: 44386 },
	{ date: "2023-03-03", value: 35090 },
	{ date: "2023-03-04", value: 35959 },
	{ date: "2023-03-05", value: 40964 },
	{ date: "2023-03-06", value: 36429 },
	{ date: "2023-03-07", value: 39366 },
	{ date: "2023-03-08", value: 46351 },
	{ date: "2023-03-09", value: 38036 },
	{ date: "2023-03-10", value: 43838 },
	{ date: "2023-03-11", value: 41752 },
	{ date: "2023-03-12", value: 47857 },
	{ date: "2023-03-13", value: 43909 },
	{ date: "2023-03-14", value: 49160 },
	{ date: "2023-03-15", value: 49748 },
	{ date: "2023-03-16", value: 47411 },
	{ date: "2023-03-17", value: 49796 },
	{ date: "2023-03-18", value: 41427 },
	{ date: "2023-03-19", value: 42725 },
	{ date: "2023-03-20", value: 35540 },
	{ date: "2023-03-21", value: 38227 },
	{ date: "2023-03-22", value: 37145 },
	{ date: "2023-03-23", value: 41768 },
	{ date: "2023-03-24", value: 48743 },
	{ date: "2023-03-25", value: 40314 },
	{ date: "2023-03-26", value: 45618 },
	{ date: "2023-03-27", value: 44115 },
	{ date: "2023-03-28", value: 45700 },
	{ date: "2023-03-29", value: 42843 },
	{ date: "2023-03-30", value: 42346 },
	{ date: "2023-03-31", value: 38134 },
	{ date: "2023-04-01", value: 39724 },
	{ date: "2023-04-02", value: 35099 },
	{ date: "2023-04-03", value: 37484 },
	{ date: "2023-04-04", value: 42531 },
	{ date: "2023-04-05", value: 38477 },
	{ date: "2023-04-06", value: 43459 },
	{ date: "2023-04-07", value: 46381 },
	{ date: "2023-04-08", value: 43448 },
	{ date: "2023-04-09", value: 39751 },
	{ date: "2023-04-10", value: 46880 },
	{ date: "2023-04-11", value: 36964 },
	{ date: "2023-04-12", value: 46679 },
	{ date: "2023-04-13", value: 45464 },
	{ date: "2023-04-14", value: 38313 },
	{ date: "2023-04-15", value: 39600 },
	{ date: "2023-04-16", value: 44468 },
	{ date: "2023-04-17", value: 39532 },
	{ date: "2023-04-18", value: 35250 },
	{ date: "2023-04-19", value: 48543 },
	{ date: "2023-04-20", value: 41014 },
	{ date: "2023-04-21", value: 37423 },
	{ date: "2023-04-22", value: 42894 },
	{ date: "2023-04-23", value: 48397 },
	{ date: "2023-04-24", value: 48445 },
	{ date: "2023-04-25", value: 41353 },
	{ date: "2023-04-26", value: 41761 },
	{ date: "2023-04-27", value: 41604 },
	{ date: "2023-04-28", value: 45488 },
	{ date: "2023-04-29", value: 44594 },
	{ date: "2023-04-30", value: 46643 },
	{ date: "2023-05-01", value: 42175 },
	{ date: "2023-05-02", value: 43944 },
	{ date: "2023-05-03", value: 43331 },
	{ date: "2023-05-04", value: 46955 },
	{ date: "2023-05-05", value: 46461 },
	{ date: "2023-05-06", value: 41405 },
	{ date: "2023-05-07", value: 47548 },
	{ date: "2023-05-08", value: 42007 },
	{ date: "2023-05-09", value: 40436 },
	{ date: "2023-05-10", value: 43648 },
	{ date: "2023-05-11", value: 44717 },
	{ date: "2023-05-12", value: 42333 },
	{ date: "2023-05-13", value: 36102 },
	{ date: "2023-05-14", value: 42833 },
	{ date: "2023-05-15", value: 41517 },
	{ date: "2023-05-16", value: 39319 },
	{ date: "2023-05-17", value: 38467 },
	{ date: "2023-05-18", value: 49760 },
	{ date: "2023-05-19", value: 49074 },
	{ date: "2023-05-20", value: 39082 },
	{ date: "2023-05-21", value: 46753 },
	{ date: "2023-05-22", value: 37524 },
	{ date: "2023-05-23", value: 37886 },
	{ date: "2023-05-24", value: 35182 },
	{ date: "2023-05-25", value: 47938 },
	{ date: "2023-05-26", value: 47515 },
	{ date: "2023-05-27", value: 42162 },
	{ date: "2023-05-28", value: 38831 },
	{ date: "2023-05-29", value: 45310 },
	{ date: "2023-05-30", value: 47933 },
	{ date: "2023-05-31", value: 35876 },
	{ date: "2023-06-01", value: 41149 },
	{ date: "2023-06-02", value: 47133 },
	{ date: "2023-06-03", value: 38025 },
	{ date: "2023-06-04", value: 46517 },
	{ date: "2023-06-05", value: 36915 },
	{ date: "2023-06-06", value: 35464 },
	{ date: "2023-06-07", value: 41297 },
	{ date: "2023-06-08", value: 42098 },
	{ date: "2023-06-09", value: 37671 },
	{ date: "2023-06-10", value: 44910 },
	{ date: "2023-06-11", value: 38012 },
	{ date: "2023-06-12", value: 38137 },
	{ date: "2023-06-13", value: 35070 },
	{ date: "2023-06-14", value: 40320 },
	{ date: "2023-06-15", value: 38358 },
	{ date: "2023-06-16", value: 41499 },
	{ date: "2023-06-17", value: 39319 },
	{ date: "2023-06-18", value: 48741 },
	{ date: "2023-06-19", value: 49382 },
	{ date: "2023-06-20", value: 45405 },
	{ date: "2023-06-21", value: 44697 },
	{ date: "2023-06-22", value: 48972 },
	{ date: "2023-06-23", value: 44038 },
	{ date: "2023-06-24", value: 38717 },
	{ date: "2023-06-25", value: 48697 },
	{ date: "2023-06-26", value: 47406 },
	{ date: "2023-06-27", value: 40121 },
	{ date: "2023-06-28", value: 43137 },
	{ date: "2023-06-29", value: 36812 },
	{ date: "2023-06-30", value: 46207 },
	{ date: "2023-07-01", value: 42549 },
	{ date: "2023-07-02", value: 45689 },
	{ date: "2023-07-03", value: 37541 },
	{ date: "2023-07-04", value: 35949 },
	{ date: "2023-07-05", value: 49310 },
	{ date: "2023-07-06", value: 38040 },
	{ date: "2023-07-07", value: 38197 },
	{ date: "2023-07-08", value: 44382 },
	{ date: "2023-07-09", value: 38306 },
	{ date: "2023-07-10", value: 42986 },
	{ date: "2023-07-11", value: 47547 },
	{ date: "2023-07-12", value: 47536 },
	{ date: "2023-07-13", value: 41835 },
	{ date: "2023-07-14", value: 40918 },
	{ date: "2023-07-15", value: 48781 },
	{ date: "2023-07-16", value: 42982 },
	{ date: "2023-07-17", value: 45323 },
	{ date: "2023-07-18", value: 47960 },
	{ date: "2023-07-19", value: 35694 },
	{ date: "2023-07-20", value: 44755 },
	{ date: "2023-07-21", value: 39928 },
	{ date: "2023-07-22", value: 41995 },
	{ date: "2023-07-23", value: 40617 },
	{ date: "2023-07-24", value: 47317 },
	{ date: "2023-07-25", value: 38929 },
	{ date: "2023-07-26", value: 43171 },
	{ date: "2023-07-27", value: 39987 },
	{ date: "2023-07-28", value: 40463 },
	{ date: "2023-07-29", value: 40652 },
	{ date: "2023-07-30", value: 45171 },
	{ date: "2023-07-31", value: 41523}
];

const greenData = [
	{ date: "2023-01-01", value: 48 },
	{ date: "2023-01-02", value: 54 },
	{ date: "2023-01-03", value: 56 },
	{ date: "2023-01-04", value: 18 },
	{ date: "2023-01-05", value: 25 },
	{ date: "2023-01-06", value: 28 },
	{ date: "2023-01-07", value: 36 },
	{ date: "2023-01-08", value: 41 },
	{ date: "2023-01-09", value: 16 },
	{ date: "2023-01-10", value: 44 },
	{ date: "2023-01-11", value: 33 },
	{ date: "2023-01-12", value: 55 },
	{ date: "2023-01-13", value: 60 },
	{ date: "2023-01-14", value: 24 },
	{ date: "2023-01-15", value: 21 },
	{ date: "2023-01-16", value: 46 },
	{ date: "2023-01-17", value: 45 },
	{ date: "2023-01-18", value: 51 },
	{ date: "2023-01-19", value: 40 },
	{ date: "2023-01-20", value: 16 },
	{ date: "2023-01-21", value: 20 },
	{ date: "2023-01-22", value: 39 },
	{ date: "2023-01-23", value: 26 },
	{ date: "2023-01-24", value: 40 },
	{ date: "2023-01-25", value: 56 },
	{ date: "2023-01-26", value: 47 },
	{ date: "2023-01-27", value: 49 },
	{ date: "2023-01-28", value: 45 },
	{ date: "2023-01-29", value: 59 },
	{ date: "2023-01-30", value: 57 },
	{ date: "2023-01-31", value: 29 },
	{ date: "2023-02-01", value: 29 },
	{ date: "2023-02-02", value: 58 },
	{ date: "2023-02-03", value: 34 },
	{ date: "2023-02-04", value: 16 },
	{ date: "2023-02-05", value: 29 },
	{ date: "2023-02-06", value: 52 },
	{ date: "2023-02-07", value: 29 },
	{ date: "2023-02-08", value: 24 },
	{ date: "2023-02-09", value: 41 },
	{ date: "2023-02-10", value: 58 },
	{ date: "2023-02-11", value: 35 },
	{ date: "2023-02-12", value: 19 },
	{ date: "2023-02-13", value: 17 },
	{ date: "2023-02-14", value: 36 },
	{ date: "2023-02-15", value: 47 },
	{ date: "2023-02-16", value: 41 },
	{ date: "2023-02-17", value: 28 },
	{ date: "2023-02-18", value: 22 },
	{ date: "2023-02-19", value: 43 },
	{ date: "2023-02-20", value: 51 },
	{ date: "2023-02-21", value: 40 },
	{ date: "2023-02-22", value: 39 },
	{ date: "2023-02-23", value: 16 },
	{ date: "2023-02-24", value: 37 },
	{ date: "2023-02-25", value: 60 },
	{ date: "2023-02-26", value: 30 },
	{ date: "2023-02-27", value: 31 },
	{ date: "2023-02-28", value: 20 },
	{ date: "2023-03-01", value: 53 },
	{ date: "2023-03-02", value: 44 },
	{ date: "2023-03-03", value: 20 },
	{ date: "2023-03-04", value: 50 },
	{ date: "2023-03-05", value: 58 },
	{ date: "2023-03-06", value: 19 },
	{ date: "2023-03-07", value: 32 },
	{ date: "2023-03-08", value: 19 },
	{ date: "2023-03-09", value: 40 },
	{ date: "2023-03-10", value: 25 },
	{ date: "2023-03-11", value: 56 },
	{ date: "2023-03-12", value: 57 },
	{ date: "2023-03-13", value: 16 },
	{ date: "2023-03-14", value: 45 },
	{ date: "2023-03-15", value: 27 },
	{ date: "2023-03-16", value: 47 },
	{ date: "2023-03-17", value: 31 },
	{ date: "2023-03-18", value: 46 },
	{ date: "2023-03-19", value: 27 },
	{ date: "2023-03-20", value: 34 },
	{ date: "2023-03-21", value: 46 },
	{ date: "2023-03-22", value: 49 },
	{ date: "2023-03-23", value: 56 },
	{ date: "2023-03-24", value: 37 },
	{ date: "2023-03-25", value: 51 },
	{ date: "2023-03-26", value: 23 },
	{ date: "2023-03-27", value: 34 },
	{ date: "2023-03-28", value: 27 },
	{ date: "2023-03-29", value: 17 },
	{ date: "2023-03-30", value: 33 },
	{ date: "2023-03-31", value: 54 },
	{ date: "2023-04-01", value: 58 },
	{ date: "2023-04-02", value: 19 },
	{ date: "2023-04-03", value: 40 },
	{ date: "2023-04-04", value: 26 },
	{ date: "2023-04-05", value: 24 },
	{ date: "2023-04-06", value: 19 },
	{ date: "2023-04-07", value: 42 },
	{ date: "2023-04-08", value: 59 },
	{ date: "2023-04-09", value: 21 },
	{ date: "2023-04-10", value: 55 },
	{ date: "2023-04-11", value: 55 },
	{ date: "2023-04-12", value: 45 },
	{ date: "2023-04-13", value: 46 },
	{ date: "2023-04-14", value: 26 },
	{ date: "2023-04-15", value: 32 },
	{ date: "2023-04-16", value: 47 },
	{ date: "2023-04-17", value: 43 },
	{ date: "2023-04-18", value: 20 },
	{ date: "2023-04-19", value: 23 },
	{ date: "2023-04-20", value: 57 },
	{ date: "2023-04-21", value: 39 },
	{ date: "2023-04-22", value: 50 },
	{ date: "2023-04-23", value: 23 },
	{ date: "2023-04-24", value: 24 },
	{ date: "2023-04-25", value: 20 },
	{ date: "2023-04-26", value: 30 },
	{ date: "2023-04-27", value: 21 },
	{ date: "2023-04-28", value: 54 },
	{ date: "2023-04-29", value: 31 },
	{ date: "2023-04-30", value: 54 },
	{ date: "2023-05-01", value: 40 },
	{ date: "2023-05-02", value: 50 },
	{ date: "2023-05-03", value: 37 },
	{ date: "2023-05-04", value: 32 },
	{ date: "2023-05-05", value: 17 },
	{ date: "2023-05-06", value: 20 },
	{ date: "2023-05-07", value: 22 },
	{ date: "2023-05-08", value: 21 },
	{ date: "2023-05-09", value: 33 },
	{ date: "2023-05-10", value: 55 },
	{ date: "2023-05-11", value: 59 },
	{ date: "2023-05-12", value: 31 },
	{ date: "2023-05-13", value: 48 },
	{ date: "2023-05-14", value: 40 },
	{ date: "2023-05-15", value: 50 },
	{ date: "2023-05-16", value: 39 },
	{ date: "2023-05-17", value: 30 },
	{ date: "2023-05-18", value: 31 },
	{ date: "2023-05-19", value: 15 },
	{ date: "2023-05-20", value: 50 },
	{ date: "2023-05-21", value: 36 },
	{ date: "2023-05-22", value: 57 },
	{ date: "2023-05-23", value: 58 },
	{ date: "2023-05-24", value: 59 },
	{ date: "2023-05-25", value: 34 },
	{ date: "2023-05-26", value: 17 },
	{ date: "2023-05-27", value: 22 },
	{ date: "2023-05-28", value: 21 },
	{ date: "2023-05-29", value: 25 },
	{ date: "2023-05-30", value: 52 },
	{ date: "2023-05-31", value: 39 },
	{ date: "2023-06-01", value: 26 },
	{ date: "2023-06-02", value: 59 },
	{ date: "2023-06-03", value: 58 },
	{ date: "2023-06-04", value: 59 },
	{ date: "2023-06-05", value: 43 },
	{ date: "2023-06-06", value: 54 },
	{ date: "2023-06-07", value: 38 },
	{ date: "2023-06-08", value: 47 },
	{ date: "2023-06-09", value: 56 },
	{ date: "2023-06-10", value: 42 },
	{ date: "2023-06-11", value: 27 },
	{ date: "2023-06-12", value: 23 },
	{ date: "2023-06-13", value: 26 },
	{ date: "2023-06-14", value: 40 },
	{ date: "2023-06-15", value: 16 },
	{ date: "2023-06-16", value: 59 },
	{ date: "2023-06-17", value: 25 },
	{ date: "2023-06-18", value: 32 },
	{ date: "2023-06-19", value: 41 },
	{ date: "2023-06-20", value: 19 },
	{ date: "2023-06-21", value: 21 },
	{ date: "2023-06-22", value: 54 },
	{ date: "2023-06-23", value: 19 },
	{ date: "2023-06-24", value: 15 },
	{ date: "2023-06-25", value: 43 },
	{ date: "2023-06-26", value: 38 },
	{ date: "2023-06-27", value: 23 },
	{ date: "2023-06-28", value: 51 },
	{ date: "2023-06-29", value: 49 },
	{ date: "2023-06-30", value: 21 },
	{ date: "2023-07-01", value: 22 },
	{ date: "2023-07-02", value: 27 },
	{ date: "2023-07-03", value: 59 },
	{ date: "2023-07-04", value: 54 },
	{ date: "2023-07-05", value: 32 },
	{ date: "2023-07-06", value: 46 },
	{ date: "2023-07-07", value: 21 },
	{ date: "2023-07-08", value: 15 },
	{ date: "2023-07-09", value: 55 },
	{ date: "2023-07-10", value: 55 },
	{ date: "2023-07-11", value: 17 },
	{ date: "2023-07-12", value: 43 },
	{ date: "2023-07-13", value: 33 },
	{ date: "2023-07-14", value: 55 },
	{ date: "2023-07-15", value: 17 },
	{ date: "2023-07-16", value: 42 },
	{ date: "2023-07-17", value: 33 },
	{ date: "2023-07-18", value: 44 },
	{ date: "2023-07-19", value: 44 },
	{ date: "2023-07-20", value: 33 },
	{ date: "2023-07-21", value: 45 },
	{ date: "2023-07-22", value: 58 },
	{ date: "2023-07-23", value: 19 },
	{ date: "2023-07-24", value: 51 },
	{ date: "2023-07-25", value: 55 },
	{ date: "2023-07-26", value: 26 },
	{ date: "2023-07-27", value: 51 },
	{ date: "2023-07-28", value: 58 },
	{ date: "2023-07-29", value: 18 },
	{ date: "2023-07-30", value: 17 },
	{ date: "2023-07-31", value: 26 },
];

const maxDate = new Date();
const minDate = new Date("2023-01-01");
const cal = new CalHeatmap();
cal.paint(
	{
		range: 1,
		itemSelector: "#cal",
		data: {
			source: commUsageData,
			type: "json",
			x: "date",
			y: "value",
		},
		date: {
			start: new Date(),
			highlight: new Date(),
			min: minDate,
			max: maxDate,
		},
		scale: {
			color: {
				scheme: "ylgnbu",
				domain: [35000, 50000],
			},
		},
		domain: {
			type: "month",
		},
		subDomain: {
			type: "day",
			label: "DD",
			width: 75,
			height: 75,
		},
	},
	[
		[
			Tooltip,
			{
				text: function (date, value, dayjsDate) {
					return (
						(value ? value + "kWh" : "No data") +
						" on " +
						dayjsDate.format("LL")
					);
				},
			},
		],
		[
			Legend,
			{
				tickSize: 0,
				width: 250,
				itemSelector: "#calHeatMap-legend",
				label: "Kotzebue kWh",
			},
		],
	]
);

//Green Map
const calGreen = new CalHeatmap();
calGreen.paint(
	{
		range: 1,
		itemSelector: "#calGreen",
		data: {
			source: greenData,
			type: "json",
			x: "date",
			y: "value",
		},
		date: {
			start: new Date(),
			highlight: new Date(),
			min: minDate,
			max: maxDate,
		},
		scale: {
			color: {
				scheme: "greens",
				domain: [0, 100],
			},
		},
		domain: {
			type: "month",
		},
		subDomain: {
			type: "day",
			label: "DD",
			width: 75,
			height: 75,
		},
	},
	[
		[
			Tooltip,
			{
				text: function (date, value, dayjsDate) {
					return (
						(value ? value + "% Renewables" : "No data") +
						" on " +
						dayjsDate.format("LL")
					);
				},
			},
		],
		[
			Legend,
			{
				tickSize: 0,
				width: 250,
				itemSelector: "#calHeatMap-legendGreen",
				label: "Kotzebue kWh",
			},
		],
	]
);

//Button Events
const prevBtn = document.getElementById("prevBtn1");
const nextBtn = document.getElementById("nextBtn1");
nextBtn.addEventListener("click", function () {
	cal.next();
});

prevBtn.addEventListener("click", function () {
	cal.previous();
});

const prevBtn2 = document.getElementById("prevBtn2");
const nextBtn2 = document.getElementById("nextBtn2");
nextBtn2.addEventListener("click", function () {
	calGreen.next();
});

prevBtn2.addEventListener("click", function () {
	calGreen.previous();
});

//Apex Charts

const doughnutOV = document.getElementById("doughnutOV");
const doughnutMain = document.getElementById("doughnutMain");
const doughnutDataKwh = [210.24, 438, 1103.73];
const doughnutLabels = ["Solar", "Wind", "Diesel"];
const colors = ["#fdd90db3", "#0095ffb3", "#8b7f00b3"];

const doughnutOVConfig = {
	series: doughnutDataKwh,
	labels: doughnutLabels,
	colors: colors,
	legend: {
		show: true,
		fontSize: "16px",
		position: "bottom",
		onItemClick: {
			toggleDataSeries: false,
		},
	},
	chart: {
		width: "350px",
		type: "donut",
		redrawOnWindowResize: true,
	},
	dataLabels: {
		enabled: true,
		dropShadow: {
			enabled: false,
		},
	},
	plotOptions: {
		pie: {
			expandOnClick: false,
			donut: {
				size: "45%",
			},
		},
	},
};

var chart = new ApexCharts(doughnutOV, doughnutOVConfig);
chart.render();

const doughnutMainConfig = {
	series: doughnutDataKwh,
	labels: doughnutLabels,
	colors: colors,
	legend: {
		show: true,
		fontSize: "16px",
		position: "top",
		onItemClick: {
			toggleDataSeries: false,
		},
	},
	chart: {
		width: "550px",
		type: "donut",
		redrawOnWindowResize: true,
		selection: {
			enabled: false,
		},
	},
	dataLabels: {
		enabled: true,
		dropShadow: {
			enabled: false,
		},
	},
	plotOptions: {
		pie: {
			expandOnClick: false,
			donut: {
				size: "45%",
				labels: {
					show: true,
					name: {
						show: true,
					},
					value: { show: true, formatter: (value) => `${value} kWh` },
					total: {
						show: true,
						color: "black",
						formatter: function (w) {
							return `${w.globals.seriesTotals.reduce((a, b) => {
								return a + b;
							}, 0)} kWh`;
						},
					},
				},
			},
		},
	},
};

var chart = new ApexCharts(doughnutMain, doughnutMainConfig);
chart.render();

//Leaflet Map
var lat = 66.8938995;
var lon = -162.5991843;
var map = L.map("map").setView([lat, lon], 12.5);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
	maxZoom: 17,
	attribution: "© OpenStreetMap",
}).addTo(map);
var marker = L.marker([lat, lon]).addTo(map);
marker.bindPopup("<b>Kotzebue Electric Association</b>").openPopup();

//Hourly Apex Bar chart
function getColor(value) {
	if (value > 1700 && value <= 1737.5) {
		return "#e6e6ff";
	} else if (value > 1737.6 && value <= 1775) {
		return "#d9d9ff";
	} else if (value > 1775.1 && value <= 1812.5) {
		return "#e6e6ff";
	} else if (value > 1812.6 && value <= 1850) {
		return "#bfbfff";
	} else if (value > 1850.1 && value <= 1887.5) {
		return "#b3b3ff";
	} else if (value > 1887.6 && value <= 1962.5) {
		return "#9999ff";
	} else if (value > 1962.6 && value <= 2000) {
		return "#8c8cff";
	} else if (value > 2000.1 && value <= 2037.5) {
		return "#8080ff";
	} else if (value > 2037.6 && value <= 2075) {
		return "#7373ff";
	} else if (value > 2075.1 && value <= 2112.5) {
		return "#6666ff";
	} else if (value > 2112.6 && value <= 2150) {
		return "#5959ff";
	} else if (value > 2150.1 && value <= 2187.5) {
		return "#4d4dff";
	} else if (value > 2187.6 && value <= 2225) {
		return "#4040ff";
	} else if (value > 2225.1 && value <= 2262.5) {
		return "#3333ff";
	} else if (value > 2262.6 && value <= 2300) {
		return "#2626ff";
	} else if (value > 2300.1 && value <= 2337.5) {
		return "#0d0dff";
	} else if (value > 2337.6 && value <= 2375) {
		return "#0d0dff";
	} else if (value > 2375.1 && value <= 2415) {
		return "#0000ff";
	} else {
		return "#ffffff";
	}
}
const apexBar = document.getElementById("apexBar");

const dataKwhWithColors = [
	{
		x: "12AM",
		y: 1876.9,
		fillColor: getColor(1876.9),
	},
	{
		x: "1AM",
		y: 1811.69,
		fillColor: getColor(1811.69),
	},
	{
		x: "2AM",
		y: 1775.28,
		fillColor: getColor(1775.28),
	},
	{
		x: "3AM",
		y: 1742.16,
		fillColor: getColor(1742.16),
	},
	{
		x: "4AM",
		y: 1708.76,
		fillColor: getColor(1708.76),
	},
	{
		x: "5AM",
		y: 1753.73,
		fillColor: getColor(1753.73),
	},
	{
		x: "6AM",
		y: 1841,
		fillColor: getColor(1841),
	},
	{
		x: "7AM",
		y: 2023.68,
		fillColor: getColor(2023.68),
	},
	{
		x: "8AM",
		y: 2187.39,
		fillColor: getColor(2187.39),
	},
	{
		x: "9AM",
		y: 2227.7,
		fillColor: getColor(2227.7),
	},
	{
		x: "10AM",
		y: 2276.34,
		fillColor: getColor(2276.34),
	},
	{
		x: "11AM",
		y: 2322.62,
		fillColor: getColor(2322.62),
	},
	{
		x: "12PM",
		y: 2372.28,
		fillColor: getColor(2372.28),
	},
	{
		x: "1PM",
		y: 2413.7,
		fillColor: getColor(2413.7),
	},
	{
		x: "2PM",
		y: 2375.22,
		fillColor: getColor(2375.22),
	},
	{
		x: "3PM",
		y: 2358.39,
		fillColor: getColor(2358.39),
	},
	{
		x: "4PM",
		y: 2400.51,
		fillColor: getColor(2400.51),
	},
	{
		x: "5PM",
		y: 2361.39,
		fillColor: getColor(2361.39),
	},
	{
		x: "6PM",
		y: 2295.82,
		fillColor: getColor(2295.82),
	},
	{
		x: "7PM",
		y: 2209.27,
		fillColor: getColor(2209.27),
	},
	{
		x: "8PM",
		y: 2138.59,
		fillColor: getColor(2138.59),
	},
	{
		x: "9PM",
		y: 2086.74,
		fillColor: getColor(2086.74),
	},
	{
		x: "10PM",
		y: 2013.54,
		fillColor: getColor(2013.54),
	},
	{
		x: "11PM",
		y: 1941.17,
		fillColor: getColor(1941.17),
	},
];
//Apex Charts Bar Chart
var optionsBar = {
	series: [
		{
			name: "Hour",
			data: dataKwhWithColors,
		},
	],
	chart: {
		height: 300,
		type: "bar",
		redrawOnWindowResize: true,
	},
	dataLabels: {
		enabled: false,
	},
};

var apexBarChart = new ApexCharts(apexBar, optionsBar);
apexBarChart.render();

//Open Weather Map
var apiKey = "5da8a595b998f8d21930856ef8458525";
var units = "imperial";
var queryURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
var weatherData;
const locationElement = document.getElementById("location");
const tempElement = document.getElementById("temp");
const feelsLikeElement = document.getElementById("feelsLike");
const humidityElement = document.getElementById("humidity");
const windProfileElement = document.getElementById("windProfile");
const weatherIconElement = document.getElementById("weatherIcon");
const weatherElement = document.getElementById("weather");
function degreesToCompassDirection(degrees) {
	var val = Math.floor(degrees / 22.5 + 0.5);
	var arr = [
		"N",
		"NNE",
		"NE",
		"ENE",
		"E",
		"ESE",
		"SE",
		"SSE",
		"S",
		"SSW",
		"SW",
		"WSW",
		"W",
		"WNW",
		"NW",
		"NNW",
	];
	return arr[val % 16];
}

function createWeatherMap(data) {
	let location = data.name;
	let feels_like = Math.round(data.main.feels_like);
	let temp = Math.round(data.main.temp);
	let humidity = Math.round(data.main.humidity);
	let wind_speed = Math.round(data.wind.speed);
	let wind_degree = data.wind.deg;
	let wind_direction = degreesToCompassDirection(data.wind.deg);
	let weather_description = data.weather[0].description;
	let weather = data.weather[0].main;
	let iconCode = data.weather[0].icon;
	locationElement.textContent = `${location}, AK`;
	tempElement.textContent = `${temp} °F`;
	feelsLikeElement.textContent = `Feels like ${feels_like} °F`;
	windProfileElement.textContent = `${wind_speed} mph ${wind_direction}`;
	humidityElement.textContent = `Humidity: ${humidity} %`;
	weatherElement.textContent = `${weather}`;
    weatherIconElement.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
}
fetch(queryURL)
	.then((response) => {
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return response.json();
	})
	.then((data) => {
		createWeatherMap(data);
	})
	.catch((e) => {
		console.log("There was a problem with your fetch operation: " + e.message);
	});
