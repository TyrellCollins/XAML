pwd
pwd
pdw
cd/ C:/program files (x86)/Arduino/hardware/esperssif/esp32
cd
cd/Arduino/hardware/espressif/esp32
cd
cd
pwd
cd
pwd
cd
dir
git submodule update --init --recursive
#!/bin/bash
#
# Setup script to configure an MSYS2 environment for ESP-IDF.
#
# Use of this script is optional, there is also a prebuilt MSYS2 environment available
# which can be downloaded and used as-is.
#
# See http://esp-idf.readthedocs.io/en/latest/windows-setup.html for full details.
if [ "$OSTYPE" != "msys" ]; then   echo "This setup script expects to be run from an MSYS2 environment on Windows.";   exit 1; fi
if ! [ -x /bin/pacman ]; then   echo "This setup script expects to use the pacman package manager from MSYS2.";   exit 1; fi
# This shell snippet appends useful esp-idf tools to your PATH environment
# variable. This means you can run esp-idf tools without needing to give the
# full path.
#
# Use this script like this:
#
# . ${IDF_PATH}/add_path.sh
#
if [ -z ${IDF_PATH} ]; then 	echo "IDF_PATH must be set before including this script."; else 	IDF_ADD_PATHS_EXTRAS="${IDF_PATH}/components/esptool_py/esptool:${IDF_PATH}/components/espcoredump:${IDF_PATH}/components/partition_table/"; 	export PATH="${PATH}:${IDF_ADD_PATHS_EXTRAS}"; 	echo "Added to PATH: ${IDF_ADD_PATHS_EXTRAS}"; fi
#!/bin/bash
#
# Setup script to configure an MSYS2 environment for ESP-IDF.
#
# Use of this script is optional, there is also a prebuilt MSYS2 environment available
# which can be downloaded and used as-is.
#
# See http://esp-idf.readthedocs.io/en/latest/windows-setup.html for full details.
if [ "$OSTYPE" != "msys" ]; then   echo "This setup script expects to be run from an MSYS2 environment on Windows.";   exit 1; fi
if ! [ -x /bin/pacman ]; then   echo "This setup script expects to use the pacman package manager from MSYS2.";   exit 1; fi
git pull
git pull
git submodule update --init
pwe
cd /c/Repos
cd /c/Repo
git remote add origin https://github.com/TyrellCollins/Repo.git
git pull origin master
