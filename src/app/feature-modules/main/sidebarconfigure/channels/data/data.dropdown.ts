export let batchAlgorithm =
    [
        {
            id: "default",
            value: "default"
        },
        {
            id: "nontransactional",
            value: "nontransactional"
        },
        {
            id: "transactional",
            value: "transactional"
        },
    ];

export let dataLoaderType = [
    {
        id: "default",
        value: "default"
    }, {
        id: "ftp_example",
        value: "ftp_example"
    }, {
        id: "bulk",
        value: "bulk"
    }, {
        id: "mangodb",
        value: "mangodb"
    },
];

export let groupLinkDirection = [
    {
        id: "W",
        value: "pull"
    }, {
        id: "P",
        value: "push"
    },
];