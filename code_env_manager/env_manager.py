from subprocess import Popen
from subprocess import PIPE
import shlex
import errno
import pexpect
import threading

INSTALL_VENV = 'virtualenv venv ; '
ACTIVATE_VENV = '. venv/bin/activate ; '
PYTHON = 'python3 '


class ShellManager:
    shell = pexpect.spawn('/bin/sh')

    def __init__(self, out_handler):
        self.out_handler = out_handler
        threading.Thread(target=self.get_stdout, daemon=True).start()

    def exec_command(self, command: str):
        self.shell.sendline(command)

    def get_stdout(self):
        while True:
            l = self.shell.readline()
            self.out_handler(bytes.decode(l))

    def shutdown(self):
        self.shell.stdin.close()

    def python_setup_routine(self, environment_path):
        self.exec_command('cd ' + environment_path)
        time.sleep(5)
        self.exec_command(INSTALL_VENV)
        time.sleep(6)
        self.exec_command(ACTIVATE_VENV)
        time.sleep(2)
        self.exec_command('pip3 install -r requirements.txt')
        time.sleep(30)

    def execute_python_file(self, relative_file_path):
        self.exec_command(PYTHON + relative_file_path)


print("here")

s = ShellManager(print)
print("here1")
import time

s.python_setup_routine('/home/caramel/PycharmProjects/ai_secure/bots/')

s.execute_python_file('test.py')
time.sleep(10)
