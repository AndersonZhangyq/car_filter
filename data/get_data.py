import requests
import json

if __name__ == "__main__":
    with open("links.txt", encoding='utf8') as f:
        links = [line.strip() for line in f.readlines()]
    car_data = None
    for link in links:
        if not link.startswith("https://www.dongchedi.com/"):
            continue
        req = requests.get(link, headers={'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36 Edg/96.0.1054.34'})
        if req.ok:
            content = req.json()
        if car_data is None:
            car_data = content['data']
        else:
            car_data['car_info'].extend(content['data']['car_info'])
            car_data['properties'].extend(content['data']['properties'])
        pass
    with open("car_data.json", "w+", encoding='utf8') as f:
        json.dump(car_data, f, ensure_ascii=False)
    pass