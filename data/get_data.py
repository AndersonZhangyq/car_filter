import requests
import json
from tqdm import tqdm
import time
from itertools import chain
import random


def get_data_from_links():
    with open("links.txt", encoding="utf8") as f:
        links = [line.strip() for line in f.readlines()]
    car_data = None
    for link in tqdm(links):
        if not link.startswith("https://www.dongchedi.com/"):
            continue
        req = requests.get(
            link,
            headers={
                "user-agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36 Edg/96.0.1054.34"
            },
        )
        if req.ok:
            content = req.json()
        if car_data is None:
            car_data = content["data"]
        else:
            car_data["car_info"].extend(content["data"]["car_info"])
            car_data["properties"].extend(content["data"]["properties"])
        time.sleep(5 + random.randint(1, 5))
    with open("car_data.json", "w+", encoding="utf8") as f:
        json.dump(car_data, f, ensure_ascii=False)


def get_data_by_condition(price_range: int or list or None):
    url = "https://www.dongchedi.com/motor/pc/car/brand/get_select_series"
    data = {
        "offset": 0,
        "limit": 30,
        "is_refresh": 0,
        "city_name": "上海",
    }
    if price_range is not None:
        if isinstance(price_range, list):
            data["price"] = f"{price_range[0]},{price_range[1]}"
        elif isinstance(price_range, int):
            data["price"] = f"0,{price_range}"
    i = 0
    car_ids = []
    car_id_cover_url = {}
    pbar = None
    while True:
        data["offset"] = i
        req = requests.post(
            url,
            data=data,
            headers={
                "user-agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36 Edg/96.0.1054.34"
            },
        )
        if req.ok:
            content = req.json()
        else:
            print(req.text)
            time.sleep(5 + random.randint(1, 5))
            continue
        car_ids.extend(
            list(
                chain(*[item['car_ids']
                        for item in content['data']['series']])))
        car_id_cover_url.update({
            item['id']: item['cover_url']
            for item in content['data']['series']
        })
        i += 1
        if pbar is None:
            pbar = tqdm(total=content['data']['series_count'])
        pbar.update(len(content['data']['series']))
        time.sleep(5 + random.randint(1, 5))
        if (len(content['data']['series']) < 30):
            break
    with open("cover_urls.json", "w+", encoding='utf8') as f:
        json.dump(car_id_cover_url, f, ensure_ascii=False)
    tail = r"&city_name=%E4%B8%8A%E6%B5%B7&version_code=444"
    car_data = None
    chunkded_car_ids = [car_ids[i:i + 10] for i in range(0, len(car_ids), 10)]
    if len(chunkded_car_ids) > 1 and len(chunkded_car_ids[-1]) < 10:
        chunkded_car_ids[-2].extend(chunkded_car_ids[-1])
        del chunkded_car_ids[-1]
    for chunk in tqdm(chunkded_car_ids):
        link = f"https://www.dongchedi.com/motor/car_page/v4/get_entity_json/?car_id_list={'%2C'.join([str(ele) for ele in chunk])}{tail}"
        req = requests.get(
            link,
            headers={
                "user-agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36 Edg/96.0.1054.34"
            },
        )
        if req.ok:
            content = req.json()
        if car_data is None:
            car_data = content["data"]
        else:
            car_data["car_info"].extend(content["data"]["car_info"])
            car_data["properties"].extend(content["data"]["properties"])
        time.sleep(5 + random.randint(1, 5))
    with open("car_data.json", "w+", encoding="utf8") as f:
        json.dump(car_data, f, ensure_ascii=False)


if __name__ == "__main__":
    get_data_by_condition(30)
