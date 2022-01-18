import json
from collections import defaultdict
import pandas as pd
from pathlib import Path

script_root = Path(__file__).parent

if __name__ == "__main__":
    with open(script_root / "car_data.json", encoding="utf8") as f:
        car_data = json.load(f)
    print("loading properties")
    properties = car_data["properties"]
    property_key_text = {}
    for prop in properties:
        property_key_text[prop["key"]] = prop["text"]
        if "sub_list" in prop:
            for sub_prop in prop["sub_list"]:
                property_key_text[
                    sub_prop["key"]
                ] = f"{prop['text']} - {sub_prop['text'] if 'text' in sub_prop else sub_prop['key']}"
    property_group = defaultdict(dict)
    i = 0
    while i < len(properties):
        item = properties[i]
        if (item["type"] != 0) and ("title_flag" not in prop):
            print(item)
            i += 1
        else:
            group_key = item["text"] + ("-tf" if "title_flag" in item else "")
            i += 1
            while i < len(properties):
                prop = properties[i]
                sub_list = None
                if (prop["type"] == 0) or ("title_flag" in prop):
                    break
                if "sub_list" in prop:
                    sub_list = {}
                    for sub_prop in prop["sub_list"]:
                        sub_list[sub_prop["key"]] = (
                            sub_prop["text"] if "text" in sub_prop else sub_prop["key"]
                        )
                if prop["key"] not in property_group[group_key]:
                    if sub_list is not None:
                        property_group[group_key][prop["key"]] = {
                            "text": prop["text"],
                            "sub_list": sub_list,
                        }
                    else:
                        property_group[group_key][prop["key"]] = {
                            "text": prop["text"]
                        }
                else:
                    if "sub_list" in property_group[group_key][prop["key"]]:
                        property_group[group_key][prop["key"]]["sub_list"].update(
                            sub_list
                        )
                i += 1
    for group_name in property_group:
        prop = property_group[group_name]
        prop_keys = list(prop.keys())
        prop_keys.sort()
        i = 1
        while i < len(prop_keys):
            if prop_keys[i].startswith(prop_keys[i - 1]):
                parent_prop_key = prop_keys[i - 1]
                if parent_prop_key in ['electric_back_door', 'auto_park']:
                    i += 1
                    continue
                child_prop_key = prop_keys[i]
                tmp = prop[child_prop_key]
                if "sub_list" in prop[parent_prop_key]:
                    if child_prop_key not in prop[parent_prop_key]["sub_list"]:
                        prop[parent_prop_key]["sub_list"][child_prop_key] = child_prop_key
                else:
                    prop[parent_prop_key]["sub_list"] = { child_prop_key: child_prop_key }
                del prop[prop_keys[i]]
                prop_keys.pop(i)
            else:
                i += 1
    with open(script_root / "../public/assets/property_group.json", "w+", encoding="utf8") as f:
        json.dump(property_group, f, ensure_ascii=False)
    print("loading car info")
    car_info = car_data["car_info"]
    for idx, item in enumerate(car_info):
        car_info[idx].update(item["info"])
        del car_info[idx]["info"]
        del car_info[idx]["open_url"]
        del car_info[idx]["dealer_url"]
        del car_info[idx]["dealer_text"]
        del car_info[idx]["leads_dark_raw_data"]
        for key, value in car_info[idx].items():
            if isinstance(car_info[idx][key], dict):
                car_info[idx][key] = car_info[idx][key]["value"]
    df = pd.DataFrame(car_info)
    df = df.fillna("-")
    df = df[(~df.gearbox_type.str.contains("手动")) & (~df.gearbox_type.str.contains("-"))]
    df.sort_values(by=["series_id", "dealer_price_value"], inplace=True)
    length = df.shape[0]
    indices = list(range(0, length, 3000))
    indices.append(length - 1)
    if indices[-1] - indices[-2] < 1000:
        indices.pop(-2)
    for i in range(1, len(indices)):
        tmp = df.iloc[indices[i - 1]:indices[i]]
        with open(script_root / f"../public/assets/car_info_{i}.json", "w+", encoding="utf8") as f:
            tmp.to_json(f, force_ascii=False, orient="records")
    # print("writing excel")
    # for idx, item in enumerate(car_info):
    #     car_info[idx] = {
    #         property_key_text[k] if k in property_key_text else k: v
    #         for k, v in car_info[idx].items()
    #     }
    # df = pd.DataFrame(car_info)
    # df = df.set_index("car_id")
    # df.to_excel("car_info.xlsx")
