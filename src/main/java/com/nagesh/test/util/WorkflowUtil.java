package com.nagesh.test.util;

import com.nagesh.test.entity.IdentityLinks;
import com.nagesh.test.entity.Process;
import com.nagesh.test.entity.ProcessTask;
import com.nagesh.test.repo.ProcessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Component
public class WorkflowUtil {

    private final ProcessRepository repo;

    @Autowired
    public WorkflowUtil(ProcessRepository repo) {
        this.repo = repo;
    }

    public Process startWorkflow(Long workflowId, String closure)
    {
        final String uri = "http://localhost:8080/engine-rest/process-definition/key/Process_03mhl62/start";
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        String reqJSON= "{\"variables\": {\"closure\": {\"value\": \""+closure+"\",\"type\":\"String\"}}}";
        System.out.println(reqJSON);
        HttpEntity<String> request = new HttpEntity<>(reqJSON, headers);

        Process response = restTemplate.postForObject(uri, request, Process.class);
        response.setWorkflowId(workflowId);
        repo.save(response);
        return response;
    }

    public void moveToken(String processInstanceId, boolean review){
        String uri = "http://localhost:8080/engine-rest/task/?processInstanceId="+processInstanceId;
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        ResponseEntity<List<ProcessTask>> rateResponse =
                restTemplate.exchange(uri,
                        HttpMethod.GET, null, new ParameterizedTypeReference<List<ProcessTask>>() {
                        });
        List<ProcessTask> taskList = rateResponse.getBody();

        uri="http://localhost:8080/engine-rest/task/"+ taskList.get(0).getId()+"/complete";

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        String reqJSON= "{\"variables\": {\"review\": {\"value\": \""+review+"\",\"type\":\"Boolean\"}}}";
        System.out.println(reqJSON);
        HttpEntity<String> request = new HttpEntity<>(reqJSON, headers);

        String result = restTemplate.postForObject(uri, request, String.class);

        System.out.println(result);
    }

    public IdentityLinks canClose(String processInstanceId){

        String uri = "http://localhost:8080/engine-rest/task/?processInstanceId="+processInstanceId;
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        ResponseEntity<List<ProcessTask>> rateResponse =
                restTemplate.exchange(uri,
                        HttpMethod.GET, null, new ParameterizedTypeReference<List<ProcessTask>>() {
                        });
        List<ProcessTask> taskList = rateResponse.getBody();

        uri="http://localhost:8080/engine-rest/task/"+ taskList.get(0).getId()+"/identity-links";


        ResponseEntity<List<IdentityLinks>> idResponse =
                restTemplate.exchange(uri,
                        HttpMethod.GET, null, new ParameterizedTypeReference<List<IdentityLinks>>() {
                        });
        List<IdentityLinks> idLinks = idResponse.getBody();
        System.out.println(idLinks.get(0).getUserId());
        return idLinks.get(0);
    }
}
