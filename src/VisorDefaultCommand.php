<?php

/**
 * Copyright 2015 University of South Florida
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

namespace USF\IdM;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Formatter\OutputFormatterStyle;
use \USF\IdM\UsfConfig;
/**
 * Description of VisorDefaultCommand
 *
 * @author james
 */
class VisorDefaultCommand extends Command {
    private $config;
    protected function configure() {
        $this->setName("visor:find")
            ->setDescription("Retrieves Visor data for passed identifier")
            ->addArgument('id',InputArgument::REQUIRED,'What is the identifier to look up?')
            ->addOption('proxy',null,InputOption::VALUE_REQUIRED,'What is proxy emplid?',false)
            ->setHelp("Usage: <info>php console.php visor:find <env></info>");
        // Access configuration values from default location (/usr/local/etc/idm_config)
        $this->config = new UsfConfig();
    }
    protected function execute(InputInterface $input, OutputInterface $output) {
        $id = $input->getArgument('id');
        if($input->getOption('proxy')) {
            $usfVisorAPI = new \USF\IdM\USFVisorAPI($this->config->visorConfig,$input->getOption('proxy'));        
            $output->writeln($usfVisorAPI->getVisor($id)->encode());
        } else {
            $usfVisorAPI = new \USF\IdM\USFVisorAPI($this->config->visorConfig);        
            $output->writeln($usfVisorAPI->getVisor($id)->encode());
        }
    }
}
