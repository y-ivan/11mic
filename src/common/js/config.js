
export const HOST = "/api/cmg/"

export const SOCKETHOST = "ws://mall.anxguo.com:8000/ws?"

export const mail = [{
    type: "163",
    image: "static/image/mail-163.png",
    api: "",
    suffix: ""
}, {
    type: "qq",
    image: "static/image/mail-qq.png",
    api: ""
}, {
    type: "126",
    image: "static/image/mail-126.png",
    api: ""
}]

export const manage = {
    "1": [{
        id: "11",
        name: "quote",
        text: "报价",
        route: "quote-list",
        color: "#41acfc"
    }, {
        id: "12",
        name: "sales",
        text: "销售订单",
        route: "sales-list",
        color: "#fda84b"
    }],
    "2": [{
        id: "21",
        name: "enquiry",
        text: "询价",
        route: "enquiry-list",
        color: "#41acfc"
    }, {
        id: "22",
        name: "purchase",
        text: "采购",
        route: "purchase-list",
        color: "#fda84b"
    }],
    "3": [{
        id: "31",
        name: "finance-receive",
        text: "收款",
        route: "finance",
        query: { receive: true },
        color: "#41acfc"
    }, {
        id: "32",
        name: "finance",
        text: "付款",
        route: "finance",
        color: "#fda84b"
    }, {
        id: "33",
        name: "purchase",
        text: "开票",
        route: "purchase",
        color: "#e6506a"
    }],
    "4": [{
        id: "41",
        name: "inventory-receive",
        text: "收货",
        route: "inventory",
        query: { receive: true },
        color: "#41acfc"
    }, {
        id: "42",
        name: "inventory",
        text: "发货",
        route: "inventory",
        color: "#fda84b"
    }, {
        id: "43",
        name: "repertory",
        text: "产品库",
        route: "repertory",
        color: "#e6506a"
    }],
    "5": [{
        id: "51",
        name: "audit",
        text: "审批",
        route: "audit",
        query: { type: 0 },
        color: "#fda84b"
    }, {
        id: "52",
        name: "enquiry",
        text: "权限修改",
        route: "purchase",
        color: "#41acfc"
    }, {
        id: "53",
        name: "contract",
        text: "合同",
        route: "contract",
        color: "#2dd048"
    }]
}

export const positions = ["管理", "销售", "采购", "仓库", "财务"]

export const positionColors = ["#7f7f7f", "#41acfc", "#2dd048", "#e6506a", "#fda84b"]
