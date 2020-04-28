import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { NodeService } from './node.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NodeService', () => {

    let httpClientSpy : { get:jasmine.Spy };

    let nodeService : NodeService ;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [  ],
            imports : [ HttpClientTestingModule ],
            providers : [ { provide: NodeService, useValue: spy } ]
        }).compileComponents();
    }));

    beforeEach(()=>{
        httpClientSpy = jasmine.createSpyObj("HttpClient", ['get']);
        nodeService = new NodeService(<any>httpClientSpy);
    });


    it('should be created', () => {
        const service: NodeService = TestBed.get(NodeService);
        expect(service).toBeTruthy();
    });

    it("should return expected nodes(HttpClient called once)",()=>{
        const expectedNodes : Node[] = [
            { id : 1 , name : "Server" },
            { id : 2 , name : "Server 2" }
        ];

        httpClientSpy.get.and.returnValue(of(expectedNodes));

        nodeService.get().subscribe(
            nodes => expect(nodes).toEqual(expectedNodes,"expected nodes"),
            fail
        )
        expect(httpClientSpy.get.calls.count()).toBe(1,"one call");
    });


});
