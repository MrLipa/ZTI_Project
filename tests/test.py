# pytest test.py
import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import os 
import time

@pytest.fixture(scope="session")
def driver():
    options = Options()
    options.add_argument("--no-sandbox")
    drv = webdriver.Chrome(os.path.join(os.getcwd(), "chromedriver"), options=options)
    yield drv
    drv.quit()

class TestMyWebsite:

    def test_button_click_and_message(self, driver):
        driver.get("http://frontend:5173")
        time.sleep(6)
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, '//*[@id="navbar-nav"]/div[1]/a[2]')))
        button = driver.find_element(By.XPATH,'//*[@id="navbar-nav"]/div[1]/a[2]')
        button.click()
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div')))
        message = driver.find_element(By.XPATH,'//*[@id="root"]/div/div').text
        assert message == "Lorem ipsum dolor sit amet, consectetur adipiscing elit."

    def test_1(self, driver):
        assert True

    def test_2(self, driver):
        assert True

    def test_3(self, driver):
        assert True

    def test_4(self, driver):
        assert True



# from selenium import webdriver
# from selenium.webdriver.chrome.options import Options
# import time

# options = Options()
# options.add_argument("--no-sandbox")

# driver = webdriver.Chrome(options=options)

# driver.get("http://www.google.com")
# driver.get("http://frontend:5173")
# time.sleep(5)
# print(driver.title)

# driver.quit()



# from selenium import webdriver
# from selenium.webdriver.chrome.options import Options
# import time
# import os

# options = Options()
# options.add_argument("--no-sandbox")

# driver = webdriver.Chrome(os.path.join(os.getcwd(), "chromedriver"), options=options)

# driver.get("http://www.google.com")
# time.sleep(5)
# print(driver.title)  # Wyświetl tytuł strony

# driver.quit()