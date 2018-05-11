export default function (appTag, blob) {
    var appName = AppNames[appTag];
    var result = {
        list: false,
        prompt: "",
        type: "single"
    };
    var choices = [];
    if (["quiplash2", "quiplash"].indexOf(appTag) !== -1) {
        if (["Gameplay_Vote"].indexOf(blob.state) !== -1) {
            if (blob.order.length == 2) { // Quiplash1/2 Regular
                choices.push({
                    name: appName,
                    choice: "left",
                    caption: true,
                    top: 252/720,
                    left: 150/1280,
                    width: 479/1280,
                    height: 273/720,
                    disabled: false
                }, {
                    name: appName,
                    choice: "right",
                    caption: true,
                    top: 224/720,
                    left: 658/1280,
                    width: 479/1280,
                    height: 273/720,
                    disabled: false
                });
            } else { // Quiplash1 Final round
                blob.order.forEach(function(orderIndex) {
                    result.list = true;
                    result.prompt = blob.question.prompt;
                    choices.push({
                        name: appName,
                        choice: orderIndex,
                        text: blob.choices[orderIndex],
                        disabled: false
                    });
                })
            }
        } else if (blob.state == "Gameplay_R3Vote") { // Quiplash2 final round
            result.list = true;
            result.prompt = blob.question.prompt;
            blob.choices.forEach(function (choice) {
                choices.push({
                    name: appName,
                    choice: choice.playerIndex,
                    text: choice.answer,
                    disabled: choice.isCensored
                })
            })
        }
    }
    if (appTag == "awshirt") {
        if (blob.state == "Vote") {
            choices.push({
                name: appName,
                choice: "left",
                caption: true,
                top: 146/720,
                left: 115/1280,
                width: 435/1280,
                height: 494/720
            }, {
                name: appName,
                choice: "right",
                caption: true,
                top: 136/720,
                left: 717/1280,
                width: 435/1280,
                height: 494/720
            });
        }
    }

    if (appTag == "overdrawn") {
        if (blob.hasOwnProperty("audience") && blob.audience.state == "MakeSingleChoice") {
            if (blob.audience.hasOwnProperty("murals") && blob.audience.murals) {
                // Murals
                var layout = layouts[appTag][blob.audience.choices.length];
                choices = layout.map(function(item, index) {
                    item.name = appName;
                    item.choice = index;
                    item.caption = true;
                    return item;
                });
            } else {
                // Naming
                result.prompt = blob.audience.text;
                result.list = true;
                blob.audience.choices.forEach(function (choice) {
                    choices.push({
                        name: appName,
                        choice: choice.index,
                        text: choice.text,
                        disabled: choice.disabled
                    })
                })
            }
        }
    }
    if (appTag == "triviadeath") {
        if (blob.hasOwnProperty("audience") && blob.audience.hasOwnProperty("choices")) {
            result.prompt = blob.audience.text;
            result.list = true;
            // blob.audience.type is "single" or "multiple"
            result.type = blob.audience.type;
            blob.audience.choices.forEach(function (choice, index) {
                choices.push({
                    name: appName,
                    choice: index,
                    text: choice.text,
                    disabled: false
                });
            });
        }
    }

    if (appTag == "fibbage3") {
        if (blob.state == "EnterText") {
            result.list = true;
            result.prompt = blob.question;
            blob.suggestions.forEach(function(choice) {
                choices.push({
                    name: appName,
                    choice: choice,
                    text: choice,
                    disabled: false
                });
            })
        } else if (blob.state == "ChooseLie") {
            var layout = layouts[appTag][blob.choices.length];
            choices = layout.map(function(item, index) {
                item.name = appName;
                item.choice = blob.choices[index].text;
                item.disabled = blob.choices[index].disabled;
                item.caption = false;
                return item;
            });
        }
    }

    if (appTag == "survivetheinternet") {
        if (blob.hasOwnProperty("audience") && blob.audience.state == "Voting") {
            var layout = layouts[appTag][blob.audience.choices.length];
            choices = layout.map(function(item, index) {
                item.name = appName;
                item.choice = index;
                item.caption = false;
                return item;
            });
        }
    }

    if (appTag == "bracketeering") {
        if (blob.hasOwnProperty("audience") && blob.audience.state == "MakeSingleChoice") {
            var layout = layouts[appTag][blob.audience.choices.length];
            choices = layout.map(function(item, index) {
                item.name = appName;
                item.choice = index;
                item.caption = false;
                return item;
            });
        }
    }


    result.choices = choices;
    return result;
};

var AppNames = {
    "quiplash": "Quiplash",
    "quiplash2": "Quiplash2",
    "awshirt": "AwShirt",
    "overdrawn": "Overdrawn",
    "triviadeath": "Trivia Death",
    "fibbage3": "Fibbage3",
    "survivetheinternet": "SurviveTheInternet"
};

var layouts = {
    "bracketeering": {
        2: [
            {
                left: 0/1280,
                top: 350/720,
                width: 640/1280,
                height: 120/720
            },{
                left: 640/1280,
                top: 350/720,
                width: 640/1280,
                height: 120/720
            }
        ],
        4: [
            {
                left: -60/1280,
                top: 296/720,
                width: 1400/1280,
                height: 64/720,
                tilted: true
            },{
                left: -60/1280,
                top: 365/720,
                width: 1400/1280,
                height: 64/720,
                tilted: true
            },{
                left: -60/1280,
                top: 433/720,
                width: 1400/1280,
                height: 64/720,
                tilted: true
            },{
                left: -60/1280,
                top: 500/720,
                width: 1400/1280,
                height: 64/720,
                tilted: true
            }
        ]
    },
    "fibbage3": {
        2: [
            {
                left: 141/1280,
                top: 339/720,
                width: 476/1280,
                height: 114/720
            },{
                left: 664/1280,
                top: 339/720,
                width: 476/1280,
                height: 114/720
            }
        ],
        3: [
            {
                left: 145/1280,
                top: 399/720,
                width: 320/1280,
                height: 87/720
            },{
                left: 478/1280,
                top: 399/720,
                width: 320/1280,
                height: 87/720
            },{
                left: 811/1280,
                top: 399/720,
                width: 320/1280,
                height: 87/720
            }
        ],
        4: [
            {
                left: 325/1280,
                top: 357/720,
                width: 305/1280,
                height: 82/720
            },{
                left: 650/1280,
                top: 357/720,
                width: 305/1280,
                height: 82/720
            },{
                left: 325/1280,
                top: 459/720,
                width: 305/1280,
                height: 82/720
            },{
                left: 650/1280,
                top: 459/720,
                width: 305/1280,
                height: 82/720
            }
        ],
        5: [
            {
                left: 344/1280,
                top: 330/720,
                width: 286/1280,
                height: 77/720
            }, {
                left: 652/1280,
                top: 330/720,
                width: 286/1280,
                height: 77/720
            }, {
                left: 498/1280,
                top: 415/720,
                width: 286/1280,
                height: 77/720
            }, {
                left: 344/1280,
                top: 502/720,
                width: 286/1280,
                height: 77/720
            }, {
                left: 650/1280,
                top: 502/720,
                width: 286/1280,
                height: 77/720
            }
        ],
        6: [
            {
                left: 194/1280,
                top: 363/720,
                width: 286/1280,
                height: 78/720
            }, {
                left: 497/1280,
                top: 363/720,
                width: 286/1280,
                height: 78/720
            }, {
                left: 799/1280,
                top: 363/720,
                width: 286/1280,
                height: 78/720
            }, {
                left: 194/1280,
                top: 457/720,
                width: 286/1280,
                height: 78/720
            }, {
                left: 497/1280,
                top: 457/720,
                width: 286/1280,
                height: 78/720
            }, {
                left: 799/1280,
                top: 457/720,
                width: 286/1280,
                height: 78/720
            }
        ],
        7: [
            {
                left: 344/1280,
                top: 318/720,
                width: 286/1280,
                height: 78/720
            },{
                left: 649/1280,
                top: 318/720,
                width: 286/1280,
                height: 78/720
            },{
                left: 193/1280,
                top: 413/720,
                width: 286/1280,
                height: 78/720
            },{
                left: 497/1280,
                top: 413/720,
                width: 286/1280,
                height: 78/720
            },{
                left: 802/1280,
                top: 413/720,
                width: 286/1280,
                height: 78/720
            },{
                left: 344/1280,
                top: 509/720,
                width: 286/1280,
                height: 78/720
            },{
                left: 650/1280,
                top: 509/720,
                width: 286/1280,
                height: 78/720
            }
        ],
        8: [
            {
                left: 190/1280,
                top: 322/720,
                width: 286/1280,
                height: 78/720
            },{
                left: 496/1280,
                top: 322/720,
                width: 286/1280,
                height: 78/720
            },{
                left: 803/1280,
                top: 322/720,
                width: 286/1280,
                height: 78/720
            },{
                left: 342/1280,
                top: 416/720,
                width: 286/1280,
                height: 78/720
            },{
                left: 652/1280,
                top: 416/720,
                width: 286/1280,
                height: 78/720
            },{
                left: 190/1280,
                top: 513/720,
                width: 286/1280,
                height: 78/720
            },{
                left: 496/1280,
                top: 513/720,
                width: 286/1280,
                height: 78/720
            },{
                left: 803/1280,
                top: 513/720,
                width: 286/1280,
                height: 78/720
            },
        ],
        9: [
            {
                left: 200/1280,
                top: 317/720,
                width: 286/1280,
                height: 78/720
            },{
                left: 497/1280,
                top: 317/720,
                width: 286/1280,
                height: 78/720
            },{
                left: 798/1280,
                top: 317/720,
                width: 286/1280,
                height: 78/720
            },{
                left: 200/1280,
                top: 412/720,
                width: 286/1280,
                height: 78/720
            },{
                left: 497/1280,
                top: 412/720,
                width: 286/1280,
                height: 78/720
            },{
                left: 798/1280,
                top: 412/720,
                width: 286/1280,
                height: 78/720
            },{
                left: 200/1280,
                top: 508/720,
                width: 286/1280,
                height: 78/720
            },{
                left: 497/1280,
                top: 508/720,
                width: 286/1280,
                height: 78/720
            },{
                left: 798/1280,
                top: 508/720,
                width: 286/1280,
                height: 78/720
            },
        ],
        10: [
            {
                left: 256/1280,
                top: 342/720,
                width: 247/1280,
                height: 67/720
            }, {
                left: 517/1280,
                top: 342/720,
                width: 247/1280,
                height: 67/720
            }, {
                left: 779/1280,
                top: 342/720,
                width: 247/1280,
                height: 67/720
            }, {
                left: 122/1280,
                top: 422/720,
                width: 247/1280,
                height: 67/720
            }, {
                left: 384/1280,
                top: 422/720,
                width: 247/1280,
                height: 67/720
            }, {
                left: 650/1280,
                top: 422/720,
                width: 247/1280,
                height: 67/720
            }, {
                left: 913/1280,
                top: 422/720,
                width: 247/1280,
                height: 67/720
            }, {
                left: 256/1280,
                top: 499/720,
                width: 247/1280,
                height: 67/720
            }, {
                left: 517/1280,
                top: 499/720,
                width: 247/1280,
                height: 67/720
            }, {
                left: 779/1280,
                top: 499/720,
                width: 247/1280,
                height: 67/720
            }
        ]
    },
    "survivetheinternet": {
        4: [
            {
                left: 122/1280,
                top: 145/720,
                width: 490/1280,
                height: 217/720
            },{
                left: 672/1280,
                top: 145/720,
                width: 490/1280,
                height: 217/720
            },{
                left: 122/1280,
                top: 394/720,
                width: 490/1280,
                height: 217/720
            },{
                left: 672/1280,
                top: 394/720,
                width: 490/1280,
                height: 217/720
            }
        ],
        5: [
            {
                left: 251/1280,
                top: 193/720,
                width: 375/1280,
                height: 166/720
            },{
                left: 656/1280,
                top: 193/720,
                width: 375/1280,
                height: 166/720
            },{
                left: 54/1280,
                top: 403/720,
                width: 375/1280,
                height: 166/720
            },{
                left: 454/1280,
                top: 403/720,
                width: 375/1280,
                height: 166/720
            },{
                left: 854/1280,
                top: 403/720,
                width: 375/1280,
                height: 166/720
            }
        ],
        6: [
            {
                left: 54/1280,
                top: 193/720,
                width: 375/1280,
                height: 166/720
            },{
                left: 454/1280,
                top: 193/720,
                width: 375/1280,
                height: 166/720
            },{
                left: 854/1280,
                top: 193/720,
                width: 375/1280,
                height: 166/720
            },{
                left: 54/1280,
                top: 403/720,
                width: 375/1280,
                height: 166/720
            },{
                left: 454/1280,
                top: 403/720,
                width: 375/1280,
                height: 166/720
            },{
                left: 854/1280,
                top: 403/720,
                width: 375/1280,
                height: 166/720
            }
        ],
        7: [
            {
                left: 71/1280,
                top: 218/720,
                width: 350/1280,
                height: 155/720
            },{
                left: 465/1280,
                top: 133/720,
                width: 350/1280,
                height: 155/720
            },{
                left: 860/1280,
                top: 218/720,
                width: 350/1280,
                height: 155/720
            },{
                left: 71/1280,
                top: 389/720,
                width: 350/1280,
                height: 155/720
            },{
                left: 465/1280,
                top: 305/720,
                width: 350/1280,
                height: 155/720
            },{
                left: 860/1280,
                top: 389/720,
                width: 350/1280,
                height: 155/720
            },{
                left: 465/1280,
                top: 475/720,
                width: 350/1280,
                height: 155/720
            }
        ],
        8: [
            {
                left: 71/1280,
                top: 133/720,
                width: 350/1280,
                height: 155/720
            },{
                left: 465/1280,
                top: 218/720,
                width: 350/1280,
                height: 155/720
            },{
                left: 860/1280,
                top: 133/720,
                width: 350/1280,
                height: 155/720
            },{
                left: 71/1280,
                top: 304/720,
                width: 350/1280,
                height: 155/720
            },{
                left: 465/1280,
                top: 389/720,
                width: 350/1280,
                height: 155/720
            },{
                left: 860/1280,
                top: 305/720,
                width: 350/1280,
                height: 155/720
            },{
                left: 71/1280,
                top: 476/720,
                width: 350/1280,
                height: 155/720
            },{
                left: 860/1280,
                top: 476/720,
                width: 350/1280,
                height: 155/720
            }
        ]
    },
    "overdrawn": {
        2: [
            {
                left: 214/1280,
                top: 125/720,
                width: 407/1280,
                height: 482/720
            }, {
                left: 650/1280,
                top: 136/720,
                width: 407/1280,
                height: 482/720
            }
        ],
        3: [
            {
                left:   120/1280,
                top:    169/720,
                width:  312/1280,
                height: 383/720
            },{
                left:   480/1280,
                top:    169/720,
                width:  312/1280,
                height: 383/720
            },{
                left:   840/1280,
                top:    169/720,
                width:  312/1280,
                height: 383/720
            }
        ],
        4: [
            {
                left:   72/1280,
                top:    201/720,
                width:  260/1280,
                height: 320/720
            },{
                left:   362/1280,
                top:    201/720,
                width:  260/1280,
                height: 320/720
            },{
                left:   652/1280,
                top:    201/720,
                width:  260/1280,
                height: 320/720
            },{
                left:   942/1280,
                top:    201/720,
                width:  260/1280,
                height: 320/720
            }
        ],
        5: [
            {
                left:   413/1280,
                top:    94/720,
                width:  208/1280,
                height: 256/720
            },{
                left:   653/1280,
                top:    94/720,
                width:  208/1280,
                height: 256/720
            },{
                left:   293/1280,
                top:    376/720,
                width:  208/1280,
                height: 256/720
            },{
                left:   533/1280,
                top:    376/720,
                width:  208/1280,
                height: 256/720
            },{
                left:   773/1280,
                top:    376/720,
                width:  208/1280,
                height: 256/720
            }
        ],
        6: [
            {
                left:   293/1280,
                top:    94/720,
                width:  208/1280,
                height: 256/720
            },{
                left:   533/1280,
                top:    94/720,
                width:  208/1280,
                height: 256/720
            },{
                left:   773/1280,
                top:    94/720,
                width:  208/1280,
                height: 256/720
            },{
                left:   293/1280,
                top:    376/720,
                width:  208/1280,
                height: 256/720
            },{
                left:   533/1280,
                top:    376/720,
                width:  208/1280,
                height: 256/720
            },{
                left:   773/1280,
                top:    376/720,
                width:  208/1280,
                height: 256/720
            }
        ],
        7: [
            {
                left:   293/1280,
                top:    94/720,
                width:  208/1280,
                height: 256/720
            },{
                left:   533/1280,
                top:    94/720,
                width:  208/1280,
                height: 256/720
            },{
                left:   773/1280,
                top:    94/720,
                width:  208/1280,
                height: 256/720
            },{
                left:   173/1280,
                top:    376/720,
                width:  208/1280,
                height: 256/720
            },{
                left:   413/1280,
                top:    376/720,
                width:  208/1280,
                height: 256/720
            },{
                left:   653/1280,
                top:    376/720,
                width:  208/1280,
                height: 256/720
            },{
                left:   893/1280,
                top:    376/720,
                width:  208/1280,
                height: 256/720
            }
        ],
        8: [
            {
                left:   173/1280,
                top:    94/720,
                width:  208/1280,
                height: 256/720
            },{
                left:   413/1280,
                top:    94/720,
                width:  208/1280,
                height: 256/720
            },{
                left:   653/1280,
                top:    94/720,
                width:  208/1280,
                height: 256/720
            },{
                left:   893/1280,
                top:    94/720,
                width:  208/1280,
                height: 256/720
            },{
                left:   173/1280,
                top:    376/720,
                width:  208/1280,
                height: 256/720
            },{
                left:   413/1280,
                top:    376/720,
                width:  208/1280,
                height: 256/720
            },{
                left:   653/1280,
                top:    376/720,
                width:  208/1280,
                height: 256/720
            },{
                left:   893/1280,
                top:    376/720,
                width:  208/1280,
                height: 256/720
            }
        ]
    }
}