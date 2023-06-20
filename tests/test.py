# pytest test.py

import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

@pytest.fixture(scope="session")
def driver():
    options = Options()
    options.add_argument("--no-sandbox")
    drv = webdriver.Chrome(options=options)
    yield drv
    drv.quit()

class TestMyWebsite:

    def test_check_help_message(self, driver):
        driver.get("http://frontend:5173")
        time.sleep(2)
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div[1]/nav/ul/li[2]/a')))
        button = driver.find_element(By.XPATH,'//*[@id="root"]/div[1]/nav/ul/li[2]/a')
        button.click()
        time.sleep(2)
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div[1]/div')))
        message = driver.find_element(By.XPATH,'//*[@id="root"]/div[1]/div').text
        assert message == "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut elit a lectus euismod pretium ut in ipsum. Aliquam velit nisi, lobortis pellentesque sodales et, ornare eget augue. Nulla facilisi. Sed eleifend, neque sit amet posuere dictum, dolor eros luctus magna, vel maximus neque ipsum et diam. Quisque vulputate dapibus tortor quis fermentum. Nullam accumsan non nibh in placerat. Suspendisse et dolor congue dolor congue tempus eget in enim."

    def test_1(self, driver):
        assert True

    def test_2(self, driver):
        assert True

    def test_3(self, driver):
        assert True

    def test_4(self, driver):
        assert True
