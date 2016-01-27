# USF Visor Client

The USF Visor Client is a command-line tool for calling the Visor web service.

## Usage

```
visorclient.phar visor:find [-- proxy PROXY] [--config CONFIG] <id>
```

### Options

proxy: An emplid for the visor service to proxy as.
config: A path to a config file containing required settings to access the visor service.

(see the ```config\SampleConfig.yml``` to see the format of the config file that can be passed)

### Arguments

id: an identifier for the account for the visor service to lookup

## Building the visorclient.phar

Before trying to build the visorclient.phar file, make sure your php.ini must 
has ```phar.readonly = Off``` set (or the build will fail).

Building it is simple. Execute ```.\build.sh``` and the visorclient.phar will
be found in the ```bin``` folder.
