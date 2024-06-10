import { CheckCircleOutlined, QuestionCircleOutlined, StopOutlined, WarningOutlined } from "@ant-design/icons";
import { notification } from "antd";

export const AlertType =
{
    info: "info",
    success: "success",
    warning: "warning",
    error: "error"
};

export const Alert = (message, type, duration = null) => {
    let title, icon;
    if (type === AlertType.info) {
        title = "INFORMACIÓN";
        icon = <QuestionCircleOutlined />;
    }
    else if (type === AlertType.success) {
        title = "ÉXITO";
        icon = <CheckCircleOutlined />;
    }
    else if (type === AlertType.warning) {
        title = "ALERTA";
        icon = <WarningOutlined />;
    }
    else if (type === AlertType.error) {
        title = "ERROR";
        icon = <StopOutlined />;
    }
    notification.open({
        message: title,
        description: message,
        duration: (duration ? null : 5),
        className: "no-select notifZ " + type,
        placement: "topRight",
        icon,
    });
};

export const CloneObject = (data) => {
    return JSON.parse(JSON.stringify(data));
};

const loop = (data, key, callback) => {
    for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
            return callback(data[i], i, data);
        }
        if (data[i].children) {
            loop(data[i].children, key, callback);
        }
    }
};

const RemoveNodeTreeR = (key, tree) => {
    for (let i = 0; i < tree.length; i++) {
        let child = tree[i].children || [];
        if (child.length > 0) RemoveNodeTreeR(key, child);
        if (tree[i].key === key)
            tree.splice(i, 1);
    }
    return tree;
};

export const RemoveNodeTree = (key, tree) => {
    return RemoveNodeTreeR(key, tree);
};

export const FactorialRecursive = (n) => {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * FactorialRecursive(n - 1);
    }
};

export const MoveTree = (info, tree) => {
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
    const data = [...tree];
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
        arr.splice(index, 1);
        dragObj = item;
    });
    if (!info.dropToGap) {
        loop(data, dropKey, (item) => {
            item.children = item.children || [];
            item.children.unshift(dragObj);
        });
    } else {
        let ar = [];
        let i;
        loop(data, dropKey, (_item, index, arr) => {
            ar = arr;
            i = index;
        });
        if (dropPosition === -1) {
            ar.splice(i, 0, dragObj);
        } else {
            ar.splice(i + 1, 0, dragObj);
        }
    }
    return data;
};

export const SetLocalStorage = (key, obj) => {
    if ((typeof obj) === "object") obj = JSON.stringify(obj);
    localStorage.setItem(key, obj);
};

export const GetLocalStorage = (obj, parse = false) => {
    let storage = localStorage.getItem(obj);
    if (storage === null) return null;
    if (parse) storage = JSON.parse(storage);
    return storage;
};
